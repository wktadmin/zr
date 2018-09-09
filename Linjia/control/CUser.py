# -*- coding: utf-8 -*-
import random
import traceback
import uuid
from datetime import datetime
from threading import Thread

from flask import request, current_app, url_for
from raven.transport import requests
from weixin import WeixinLogin


from Linjia.commons.error_response import NOT_FOUND, SYSTEM_ERROR
from Linjia.commons.params_required import parameter_required
from Linjia.commons.success_response import Success
from Linjia.commons.token_handler import usid_to_token
from Linjia.configs.phone_code import auth_key, code_url
from Linjia.configs.timeformat import format_for_db
from Linjia.configs.url_config import HTTP_HOST
from Linjia.configs.wxconfig import APPID, APPSECRET
from Linjia.service import SUser, SUserCode


class CUser():
    def __init__(self):
        self.suser = SUser()
        self.susercode = SUserCode()
        self.wxlogin = WeixinLogin(APPID, APPSECRET)

    def admin_login(self):
        """管理员登录"""
        data = parameter_required('username', 'password')
        username = data.get('username')
        password = data.get('password')
        admin = self.suser.verify_admin_login(username, password)
        if not admin:
            raise NOT_FOUND(u'用户名或者密码错误')
        level = admin.ADlevel  # 管理员等级
        token = usid_to_token(admin.ADid, 'Admin')
        return Success(u'获取token成功', {
            'token': token,
            'level': level
        })

    def login(self):
        """登录, 没有用户则自动创建"""
        data = parameter_required('phone', 'code')
        phone = str(data.get('phone'))
        code = int(data.get('code'))
        usercode = self.susercode.get_active_usercode_by_phone_code(phone, code)
        if not usercode:
            return NOT_FOUND(u'验证码已过期或不正确')
        user = self.suser.get_user_by_phone(phone)
        if not user:
            user_dict = {
                'usid': str(uuid.uuid4()),
                'USphone': str(phone),
            }
            self.suser.add_model('User', **user_dict)
            token = usid_to_token(user_dict['usid'])
        else:
            token = usid_to_token(user.USid)
        return Success(u'获取token成功', {
            'token': token
        })

    def get_code(self):
        """发送验证码"""
        data = parameter_required('phone')
        phone = data.get('phone')
        send = Thread(target=self.async_send_code, args=(phone, ))
        send.start()
        message = u'获取成功'
        return Success(message)

    def wechat_login(self):
        """获取微信跳转链接"""
        url = self.wxlogin.authorize(HTTP_HOST + "/user/weixin_callback/", "snsapi_base")
        return Success(u'获取跳转链接成功',  {'url': url}, status=302)

    def weixin_callback(self):
        """获取用户信息"""
        args = request.args.to_dict()
        code = args.get('code')
        data = self.wxlogin.access_token(code)
        print data.access_token
        print data.refresh_token
        print data.openid
        data = self.wxlogin.user_info(data.access_token, data.openid)
        return data

    def get_wx_config(self):
        data = request.json
        if not data:
            data = {}
        current_url = data.get('url', request.url)
        from Linjia.configs.wxconfig import APPID, APPSECRET
        from weixin.mp import WeixinMP
        mp = WeixinMP(APPID, APPSECRET)
        print(current_url)
        data = {
            'config': mp.jsapi_sign(url=current_url),
            'jsp_ticket': mp.jsapi_ticket,
            'url': current_url
        }
        response = Success(u'返回签名成功', data)
        return response

    def async_send_code(self, phone):
        headers = {
            'Authorization': auth_key
        }
        code = str(random.randint(1111, 9999))
        url = code_url.format(code, phone)
        content_json = requests.post(url, headers=headers).json()
        if content_json.get('return_code') == '00000':
            print(0000)
            data = {
                'UCid': str(uuid.uuid4()),
                'Codenum': int(code),
                'Phone': phone,
                'Createtime': datetime.strftime(datetime.now(), format_for_db)
            }
            self.suser.add_model('UserCode', **data)
        else:
            raise SYSTEM_ERROR(traceback.format_exc().decode('unicode-escape'))

