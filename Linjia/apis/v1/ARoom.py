# -*- coding: utf-8 -*-
from Linjia.commons.base_resource import Resource
from Linjia.control import CRoom, CGuide


class ARoom(Resource):
    def __init__(self):
        self.croom = CRoom()

    def get(self, room):
        apis = {
            'get_list': self.croom.get_list,  # 房源筛选
            'get_detail': self.croom.get_detail,  # 房源详情
            'get_detail2': self.croom.get_detail_the_same_like_add,  # 暂时不用
            'get_city': self.croom.get_oppener_city,  # 获取租房开放城市
            'get_area_by_cityid': self.croom.get_area_by_citynum,  # 获取区域信息
            'get_subway': self.croom.get_subwayline_by_citynum,
            'get_position': self.croom.get_subway_potion_by_lineid,
            'get_joinroom_banner': self.croom.get_joinroom_banner,
            'get_homestay_banner': self.croom.get_homestay_banner,
            'get_villege_info': self.croom.get_villegeinfo_by_namekeyword,  # 模糊搜索小区信息
        }
        return apis

    def post(self, room):
        apis = {
            'add_joinroom_banner': self.croom.add_joinroom_banner,  # 合租
            'add_homestay_banner': self.croom.add_homestay_banner,
            'delete_join_room_banner': self.croom.delete_joinroom_banner,
            'delete_homestay_banner': self.croom.delete_homestay_banner,
            'add_room': self.croom.add_room,  # 添加房源
            'add_villegetinfo': self.croom.add_villegetinfo,  # 添加小区信息
            'update_villeginfo': self.croom.update_villeginfo,  # 更新小区信息
            'add_bedroom': self.croom.add_bedroom,  # 添加卧室
            'update_bedroom': self.croom.update_bedroom,
            'delete_bedroom': self.croom.delete_bedroom,
            'update_room': self.croom.update_room,  # 更新房源信息
            'delete_room': self.croom.delete_room,
            'add_room_city': self.croom.add_room_opencity,  # 添加租户开放城市
            'delete_room_city': self.croom.del_room_opencity,
            'add_hot_city': self.croom.add_hot_city,  # 热门城市
            'cancle_hot_city': self.croom.cancle_hot_city,
        }
        return apis


class AGuide(Resource):
    def __init__(self):
        self.cguide = CGuide()

    def get(self, guide):
        apis = {
            'get_list': self.cguide.get_list,
            'get_guide': self.cguide.get_guide,
        }
        return apis
    
    def post(self, guide):
        apis = {
            'add_guide': self.cguide.add_customerguide,
            'update_guide': self.cguide.update_guide,
            'delete_guide': self.cguide.delete_guide,
        }
        return apis
