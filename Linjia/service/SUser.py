# -*- coding: utf-8 -*-
from sqlalchemy import and_
from werkzeug.security import check_password_hash

from Linjia.commons.base_service import SBase, close_session
from Linjia.models import User, UserRoom, Admin, Staff


class SUser(SBase):
    @close_session
    def get_user_by_openid(self, openid):
        return self.session.query(User).filter_by(WXopenid=openid).first()

    @close_session
    def get_user_by_usid(self, usid):
        return self.session.query(User).filter_by(USid=usid).first()

    @close_session
    def get_user_list(self, page=None, count=None, gender=None, contain_filter=None, usid=None):
        """获取用户列表, 管理员使用"""
        return self.session.query(User).filter_ignore_none_args(User.USisdelete==False, User.USgender==gender, User.USid==usid).\
            contain(User.USphone==contain_filter).\
            order_by(User.USlastlogin.desc()).all_with_page(page, count)

    @close_session
    def get_user_by_phone(self, phone):
        return self.session.query(User).filter_by(USphone=phone).first()

    @close_session
    def update_user_by_usid(self, usid, data):
        """更新用户资料"""
        return self.session.query(User).filter_by(USid=usid).update(data)

    @close_session
    def update_user_by_phone(self, phone, data):
        return self.session.query(User).filter(User.USphone==phone).update(data)

    # 2018-09-12 不再使用
    @close_session
    def get_user_by_roid(self, roid):
        """获取房间的租户"""
        return self.session.query(User).join(UserRoom, User.USid==UserRoom.USid).filter_by(ROid=roid).first()

    @close_session
    def verify_admin_login(self, username, password):
        """验证管理员登录帐号和密码"""
        admin = self.session.query(Admin).filter_by(ADusername=username, ADisfreeze=False).first()
        if admin and check_password_hash(admin.ADpassword, password):
            return admin

    @close_session
    def get_staff_list(self, level=None, page=None, count=None, gender=None, city_id=None, kw=None):
        """获取工作人员列表"""
        filter_list = [Staff.STFgender == gender, Staff.STFlevel == level]
        staff_list = self.session.query(Staff).filter(and_(*filter(lambda x: hasattr(x.right, 'value'), filter_list))).filter(Staff.STFisdelete==False).filter_ignore_none_args(Staff.ADcityid==city_id)
        if kw is not None:
            staff_list = staff_list.filter(Staff.STFname.contains(kw))
        return staff_list.order_by(Staff.STFcreatetime.desc()).all_with_page(page, count)

    @close_session
    def update_staff_info(self, stfid, data):
        """修改工作人员"""
        return self.session.query(Staff).filter(Staff.STFid==stfid).update(data)

    @close_session
    def get_staff_by_stfid(self, stfid):
        """根据id获取工作人员"""
        return self.session.query(Staff).filter(Staff.STFid==stfid, Staff.STFisdelete==False).first()

    @close_session
    def get_staff_by_city_id(self, city_id):
        """获取城市内的工作人员"""
        return self.session.query(Staff).filter(Staff.ADcityid==city_id, Staff.STFisdelete==False,Staff.STFisblocked==False).all()

    @close_session
    def delete_staff_by_stfid(self, stfid):
        """根据id删除工作人员"""
        return self.session.query(Staff).filter(Staff.STFid==stfid, Staff.STFisdelete==False).update({
            'STFisdelete': True
        })

    @close_session
    def get_admin_by_adusername(self, adusername):
        """根据管理员的用户名查询"""
        return self.session.query(Admin).filter(Admin.ADusername==adusername).first()

    @close_session
    def get_admin_by_adid(self, adid):
        """根据管理员id获取"""
        return self.session.query(Admin).filter(Admin.ADid==adid).first()

    @close_session
    def update_admin_by_adid(self, adid, data):
        """根据管理员id获取"""
        return self.session.query(Admin).filter(Admin.ADid==adid).update(data)

    @close_session
    def freeze_adiin_by_adid(self, adid):
        """冻结管理员"""
        return self.session.query(Admin).filter(Admin.ADid==adid).update({
            'ADisfreeze': True
        })

    @close_session
    def unfreeze_admin_by_adid(self, adid):
        """解冻管理员"""
        return self.session.query(Admin).filter(Admin.ADid==adid).update({
            'ADisfreeze': False
        })

    @close_session
    def get_admin_list(self, level=None, freeze=None, page=None, count=None):
        """获取管理员列表"""
        return self.session.query(Admin).filter_ignore_none_args(Admin.ADlevel == level, Admin.ADisfreeze == freeze).all_with_page(page, count)








