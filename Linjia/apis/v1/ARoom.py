# -*- coding: utf-8 -*-
from Linjia.commons.base_resource import Resource
from Linjia.control import CRoom


class ARoom(Resource):
    def __init__(self):
        self.croom = CRoom()

    def get(self, room):
        apis = {
            'get_list': self.croom.get_list,
            'get_detail': self.croom.get_detail,
            'get_city': self.croom.get_oppener_city,
            'get_area_by_cityid': self.croom.get_area_by_citynum,
            'get_subway': self.croom.get_subwayline_by_citynum,
            'get_position': self.croom.get_subway_potion_by_lineid,
            'get_joinroom_banner': self.croom.get_joinroom_banner,
        }
        return apis

    def post(self, room):
        apis = {'add_joinroom_banner': self.croom.add_joinroom_banner}
        return apis
