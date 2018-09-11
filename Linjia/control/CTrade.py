# -*- coding: utf-8 -*-
import uuid
from datetime import datetime

from flask import request

from Linjia.commons.baidu_map import BdMap
from Linjia.commons.error_response import TOKEN_ERROR, PARAMS_ERROR, NOT_FOUND
from Linjia.commons.params_validates import parameter_required, validate_phone
from Linjia.commons.success_response import Success
from Linjia.commons.token_handler import is_admin, is_tourist
from Linjia.configs.enums import SERVER_STATUS, COMPLAIN_STATUS
from Linjia.configs.server_config import MOVER_APPOINT_MAX_TIME_ON_ROAD, MOVER_APPOINT_MIN_TIME_ON_ROAD
from Linjia.configs.timeformat import format_for_db
from Linjia.service import STrade, SServer, math


class CTrade(object):
    def __init__(self):
        self.strade = STrade()
        self.sserver = SServer()

    def add_providehouse_apply(self):
        """申请房源"""
        if is_admin():
            return TOKEN_ERROR(u'普通用户才可以申请')
        if is_tourist():
            return TOKEN_ERROR(u'请登录后申请')
        data = parameter_required(('phacity', 'phavillege', 'phaphone', 'phaname'), others='ignore')
        validate_phone(data.get('phaphone'))
        usid = request.user.id
        already_apply = self.strade.get_provide_appy_by_usid_village(usid, data.get('phavillege'))
        if not already_apply:
            data['usid'] = usid
            data['PHAcreatetime'] = datetime.strftime(datetime.now(), format_for_db)
            data['PHAid'] = str(uuid.uuid4())
            self.strade.add_model('ProvideHouseApply', data)
        return Success(u'申请成功, 等待管家回电')

    def mover_appointment(self):
        """搬家预约"""
        if is_admin():
            return TOKEN_ERROR(u'普通用户才可以预约')
        if is_tourist():
            return TOKEN_ERROR(u'请登录后预约')
        required = ('smsid', 'umtstarttime', 'umtmoveoutaddr', 'umtmoveinaddr',
                    'umtmoveoutlocation', 'umtmoveinlocation', 'umtphone', 'umtspecialwish', 'umtpreviewprice')
        data = parameter_required(required, others='ignore')
        # 是否存在这个服务
        mover_exsits = self.sserver.get_mover_by_smsid(data.get('smsid'))
        if not mover_exsits:
            raise NOT_FOUND(u'不存在服务{}'.format(data.get('smsid')))
        validate_phone(data.get('umtphone'))
        self._allow_starttime(data.get('umtstarttime'))
        data['UMTid'] = str(uuid.uuid4())
        data['usid'] = request.user.id
        data['UMTcreatetime'] = datetime.strftime(datetime.now(), format_for_db)
        model_bean_dict = self.strade.add_model('UserMoveTrade', data, ['UMTstarttime', 'UMTid'])
        model_bean_dict['name'] = mover_exsits.SMStitle
        return Success(u'预约成功', model_bean_dict)

    def cleaner_appiontment(self):
        """清洁服务预约"""
        if is_admin():
            return TOKEN_ERROR(u'普通用户才可以预约')
        if is_tourist():
            return TOKEN_ERROR(u'请登录后预约')
        required = ('sceid', 'uctpreviewstarttime', 'uctaddr', 'uctpreviewlastingtime', 'uctphone', 'uctprice', 'uctspecialwish', 'uctlocation')
        data = parameter_required(required, others='ignore')
        cleaner_exists = self.sserver.get_cleanerserver_by_sceid(data.get('sceid'))
        if not cleaner_exists:
            raise NOT_FOUND(u'不存在的清洁服务')
        validate_phone(data.get('uctphone'))
        self._allow_starttime(data.get('uctpreviewstarttime'))
        data['uctid'] = str(uuid.uuid4())
        data['usid'] = request.user.id
        data['UCTcreatetime'] = datetime.strftime(datetime.now(), format_for_db)
        modelbean_dict = self.sserver.add_model('UserCleanTrade', data, ['UCTpreviewstarttime', 'UCTid'])
        modelbean_dict['name'] = cleaner_exists.SCMtitle
        return Success(u'预约成功', modelbean_dict)

    def fixer_appiontment(self):
        """维修预约"""
        if is_admin():
            return TOKEN_ERROR(u'只有普通用户才可以预约')
        if is_tourist():
            return TOKEN_ERROR(u'请登录后预约')
        required = ('uftaddr' , 'uftstarttime', 'uftphone', 'uftlocation')
        forbidden = ('usid', 'uftstatus')
        data = parameter_required(required, forbidden=forbidden)
        validate_phone(data.get('uftphone'))
        self._allow_starttime(data.get('uftstarttime'))
        data['UFTid'] = str(uuid.uuid4())
        data['usid'] = request.user.id
        data['UFTcreatetime'] = datetime.strftime(datetime.now(), format_for_db)
        model_bean_dict = self.sserver.add_model('UserFixerTrade', data, ['UFTid', 'UFTstarttime'])
        model_bean_dict['name'] = u'维修预约'
        return Success(u'预约成功', model_bean_dict)

    def get_my_oppintment(self):
        """获得我的预约搬家, 维修, 清洁 type=mover, fixer, cleaner"""
        if is_admin():
            return TOKEN_ERROR(u'普通用户查看')
        if is_tourist():
            return TOKEN_ERROR(u'请登录后查看')
        data = parameter_required()
        data['page_num'] = int(data.get('page', 1))
        data['page_size'] = int(data.get('count', 15))
        usid = request.user.id
        server_type = data.get('type')
        if server_type == 'mover':
            order_list = self.strade.get_mover_serverlist_by_usid(usid, data)
            map(lambda x: x.clean.add('UMTid', 'SMSid', 'UMTstarttime', 'UMTmoveoutaddr',
                                      'UMTmoveinaddr', 'UMTphone', 'UMTspecialwish',
                                      'UMTpreviewprice', 'UMTmoveinlocation', 'UMTmoveoutlocation', 'USid', 'UMTcreatetime'), order_list)
            map(lambda x: x.fill(SERVER_STATUS.get(x.UMTstatus), 'umtstatus'), order_list)
            map(lambda x: x.fill(self.sserver.get_mover_by_smsid(x.SMSid).SMStitle, 'name'), order_list)
            map(lambda x: x.fill('mover', 'type'), order_list)
        elif server_type == 'fixer':
            order_list = self.strade.get_fixer_serverlist_by_usid(usid, data)
            map(lambda x: setattr(x, 'UFTstatus', SERVER_STATUS.get(x.UFTstatus)), order_list)
            map(lambda x: x.fill(u'fixer', 'type'), order_list)
        elif server_type == 'cleaner':
            order_list = self.strade.get_clean_serverlist_by_usid(usid, data)
            map(lambda x: setattr(x, 'UCTstatus', SERVER_STATUS.get(x.UCTstatus)), order_list)
            map(lambda x: x.fill(self.sserver.get_cleanerserver_by_sceid(x.SCEid).SCMtitle, 'name'), order_list)
            map(lambda x: x.fill('cleaner', 'type'), order_list)
        else:
            mover_order_list = self.strade.get_mover_serverlist_by_usid(usid)
            fixer_order_list = self.strade.get_fixer_serverlist_by_usid(usid)
            cleaner_list = self.strade.get_clean_serverlist_by_usid(usid)
            order_list = mover_order_list + fixer_order_list + cleaner_list
            len_order_list = len(order_list)
            page_size = data['page_size']
            start = (data['page_num'] - 1) * data['page_size']
            end = start + page_size
            if end > len_order_list:
                end = len_order_list
            if start > end:
                start = end
            order_list = order_list[start: end]
            # 搬家

            map(lambda x: x.clean.add('UMTid', 'SMSid', 'UMTstarttime', 'UMTmoveoutaddr',
                                      'UMTmoveinaddr', 'UMTphone', 'UMTspecialwish',
                                      'UMTpreviewprice', 'UMTmoveinlocation', 'UMTmoveoutlocation', 'USid', 'UMTcreatetime'), mover_order_list)
            map(lambda x: x.fill(getattr(self.sserver.get_mover_by_smsid(x.SMSid), 'SMStitle', u'未知'), 'name'),
                mover_order_list)
            map(lambda x: x.fill('mover', 'type'), mover_order_list)
            map(lambda x: x.fill(SERVER_STATUS.get(x.UMTstatus), 'umtstatus'), mover_order_list)
            map(lambda x: setattr(x, 'createtime', x.UMTcreatetime), mover_order_list)
            # 清洁
            map(lambda x: x.fill(getattr(self.sserver.get_cleanerserver_by_sceid(x.SCEid), 'SCMtitle', u'未知'), 'name'), cleaner_list)
            map(lambda x: setattr(x, 'UCTstatus', SERVER_STATUS.get(x.UCTstatus)), cleaner_list)
            map(lambda x: setattr(x, 'createtime', x.UCTcreatetime), cleaner_list)
            map(lambda x: x.fill('cleaner', 'type'), cleaner_list)
            # 维修
            map(lambda x: setattr(x, 'createtime', x.UFTcreatetime), fixer_order_list)
            map(lambda x: x.fill(u'邻家维修', 'name'), fixer_order_list)
            map(lambda x: setattr(x, 'UFTstatus', SERVER_STATUS.get(x.UFTstatus)), fixer_order_list)
            map(lambda x: x.fill(u'fixer', 'type'), fixer_order_list)
            order_list = sorted(order_list, key=lambda x: x.createtime)
            request.page_count = math.ceil(float(len_order_list) / page_size)
            request.all_count = len_order_list
        return Success(u'获取列表成功', order_list)

    def add_complaint(self):
        if is_admin():
            raise TOKEN_ERROR(u'只有普通用户才可是投诉')
        if is_tourist():
            raise TOKEN_ERROR(u'请登录后投诉')
        data = parameter_required(('usercomplainttext', 'usercomplaintaddress', 'usercomplaintphone'), others='ignore')
        validate_phone(data.get('usercomplaintphone'))
        data['usid'] = request.user.id
        data['UserComplaintid'] = str(uuid.uuid4())
        data['UserComplaintcreatetime'] = datetime.strftime(datetime.now(), format_for_db)
        self.strade.add_model('UserComplaint', data)
        return Success(u'投诉成功')

    def get_complaint_list(self):
        if not is_admin():
            raise TOKEN_ERROR(u'请使用管理员登录')
        args = request.args.to_dict()
        page = int(args.get('page', 1))
        count = int(args.get('count', 15))
        complain_list = self.strade.get_complaint_list(page, count)
        map(lambda x: setattr(x, 'UserComplaintstatus', COMPLAIN_STATUS[x.UserComplaintstatus]), complain_list)
        return Success(u'获取投诉列表成功', complain_list)

    @staticmethod
    def _allow_starttime(str_time):
        try:
            startime = datetime.strptime(str_time, format_for_db)
        except Exception as e:
            raise PARAMS_ERROR(str(str_time) + u'时间格式不正确')
        time_on_road_seconds = (startime - datetime.now()).total_seconds()
        if MOVER_APPOINT_MIN_TIME_ON_ROAD < time_on_road_seconds < MOVER_APPOINT_MAX_TIME_ON_ROAD:
            return str_time
        raise PARAMS_ERROR(u'时间不合理, 2小时至7天')

