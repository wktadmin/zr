# *- coding:utf8 *-
from Linjia.commons.base_resource import Resource
from Linjia.control import CUser


class AUser(Resource):
    def __init__(self):
        self.cuser = CUser()

    def get(self, user):
        print(user)
        apis = {
            'wechat_login': self.cuser.wechat_login,
            'weixin_callback': self.cuser.weixin_callback,
            'staff_list': self.cuser.get_staff_list,
        }
        return apis

    def post(self, user):
        apis ={
            'admin_login': self.cuser.admin_login,
            'get_code': self.cuser.get_code,
            'login': self.cuser.login,
            'get_wechat_config': self.cuser.get_wx_config,
            'update_staff': self.cuser.update_staff,
            'add_staff': self.cuser.add_staff,
        }
        return apis