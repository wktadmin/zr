# -*- coding: utf-8 -*-
import math
from datetime import datetime

from flask import request

from Linjia.commons.base_service import SBase, close_session
from Linjia.configs.timeformat import format_for_db
from Linjia.models import ProvideHouseApply, UserMoveTrade, UserCleanTrade, UserFixerTrade, UserComplaint


class STrade(SBase):
    @close_session
    def get_provide_appy_by_usid_village(self, usid, villege):
        """根据电话或小区查询提交记录"""
        return self.session.query(ProvideHouseApply).\
            filter(ProvideHouseApply.USid==usid, ProvideHouseApply.PHAvillege==villege).first()

    @close_session
    def get_mover_serverlist_by_usid(self, usid=None, args=None):
        if args:
            mover_order_list = self.session.query(UserMoveTrade).filter_ignore_none_args(UserMoveTrade.USid==usid)
            page_num = args.get('page_num')
            page_size = args.get('page_size')
            return mover_order_list.order_by(UserMoveTrade.UMTcreatetime.desc()).all_with_page(page_num, page_size)
        return self.session.query(UserMoveTrade).order_by(UserMoveTrade.UMTcreatetime.desc()).all()

    @close_session
    def get_clean_serverlist_by_usid(self, usid=None, args=None):
        if args:
            cleanserver_order_list = self.session.query(UserCleanTrade).filter_ignore_none_args(UserCleanTrade.USid == usid)
            return cleanserver_order_list.order_by(UserCleanTrade.UCTcreatetime.desc()).all_with_page(args.get('page_num'), args.get('page_size') )
        return self.session.query(UserCleanTrade).order_by(UserCleanTrade.UCTcreatetime.desc()).all()

    @close_session
    def get_fixer_serverlist_by_usid(self, usid=None, args=None):
        if args:
            fixer_order_list = self.session.query(UserFixerTrade).filter_ignore_none_args(UserFixerTrade.USid==usid)
            return fixer_order_list.order_by(UserFixerTrade.UFTcreatetime.desc()).all_with_count(args.get('page_num'), args.get('page_size'))
        return self.session.query(UserFixerTrade).order_by(UserFixerTrade.UFTcreatetime.desc()).all()

    @close_session
    def get_complaint_list(self, page, count, status=None):
        """查看投诉列表"""
        all_complaint = self.session.query(UserComplaint)
        if status:
            all_complaint = all_complaint.filter(UserComplaint.UserComplaintstatus==status)
        return all_complaint.order_by(UserComplaint.UserComplaintcreatetime.desc()).all_with_page(page, count)

    @close_session
    def get_complaint_by_complaintid(self, compid):
        """根据投诉id获取投诉"""
        return self.session.query(UserComplaint).filter(UserComplaint.UserComplaintid==compid).first()

    @close_session
    def update_somplaint_by_complaintid(self, compid, status):
        """更新投诉处理状态"""
        return self.session.query(UserComplaint).filter(UserComplaint.UserComplaintid==compid).update(status)

    @close_session
    def get_provideapply_list(self, page, count, status=None, **kwargs):
        """管理员获取业主申请房源列表"""
        provide_list = self.session.query(ProvideHouseApply)
        if status:
            provide_list = provide_list.filter(ProvideHouseApply.PAHstatus==status)
        return provide_list.order_by(ProvideHouseApply.PHAcreatetime).all_with_page(page, count)
    
    @close_session
    def get_mover_serverlist(self, args=None):
        if args:
            mover_order_list = self.session.query(UserMoveTrade)
            page_num = args.get('page_num')
            page_size = args.get('page_size')
            return mover_order_list.order_by(UserMoveTrade.UMTcreatetime.desc()).all_with_page(page_num, page_size)
        return self.session.query(UserMoveTrade).order_by(UserMoveTrade.UMTcreatetime.desc()).all()

    @close_session
    def get_clean_serverlist(self, args=None):
        if args:
            cleanserver_order_list = self.session.query(UserCleanTrade)
            return cleanserver_order_list.order_by(UserCleanTrade.UCTcreatetime.desc()).all_with_page(args.get('page_num'), args.get('page_size') )
        return self.session.query(UserCleanTrade).order_by(UserCleanTrade.UCTcreatetime.desc()).all()

    @close_session
    def get_fixer_serverlist(self, args=None):
        if args:
            fixer_order_list = self.session.query(UserFixerTrade)
            return fixer_order_list.order_by(UserFixerTrade.UFTcreatetime.desc()).all_with_count(args.get('page_num'), args.get('page_size'))
        return self.session.query(UserFixerTrade).order_by(UserFixerTrade.UFTcreatetime.desc()).all()

 
