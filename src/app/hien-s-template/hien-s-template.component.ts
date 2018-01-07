import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loc-trans-hien-s-template',
  templateUrl: './hien-s-template.component.html',
  styleUrls: ['./hien-s-template.component.scss']
})
export class HienSTemplateComponent implements OnInit {

  public data = MOCK_DATA;
  public commentBundle;
  constructor() { }

  ngOnInit() {
    this.commentBundle = Array.from(this.data.entries());
  }
}

export interface ProductComment {
  product: Product;
  comments: Comment[];
}

export interface Comment {
  userAvatarUrl?: string;
  userName: string;
  time: string;
  comment: string;
}

export interface Product {
  name: string;
  url: string;
  seller: string;
}

const MOCK_DATA: Map<string, ProductComment[]> = new Map([
  ["Lazada", [
    {
      "product": {
        "name":"iphone 5se",
        "url":"lazada-iphone5se",
        "seller":"Thế Giới Di Động"
      },
      "comments":[
        {
          "userName":"Nguyễn Minh Phúc",
          "comment":"Bao nhiêu là BitCoin mất hết =))",
          "time": "5 giờ trước"
        },
        {
          "userName":"Hoàng Dương Huy",
          "comment":"link toàn die mà vẫn còn quảng cáo được à.đm thg ad",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphone6s",
        "url":"lazada-iphone6s",
        "seller":"Vĩnh Phát"
      },
      "comments":[
        {
          "userName":"Nguyên Hồ",
          "comment":"sao tui con bình thường mà ????",
          "time": "5 giờ trước"
        },
        {
          "userName":"phạm phạm",
          "comment":"viền dễ bị trầy :(",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphone6splus",
        "url":"lazada-iphone6splus",
        "seller":"FPT Shop"
      },
      "comments":[
        {
          "userName":"Vương Ngọc Anh",
          "comment":"co toi rat hai long voi san pham nay toi se doi thieu ban be cung den mua hang`",
          "time": "5 giờ trước"
        },
        {
          "userName":"Bin's Ngốc",
          "comment":"tuy đẹp thật nhưng đôí với vài người thì hơi đắt",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphonex",
        "url":"lazada-iphonex",
        "seller":"Viễn Thông A"
      },
      "comments":[
        {
          "userName":"Chung Phú Bùi",
          "comment":"sản phẩm đẹp",
          "time": "5 giờ trước"
        }
      ]
    }
  ]],
  ["Adayroi", [
    {
      "product": {
        "name":"iphone5se",
        "url":"adayroi-iphone5se",
        "seller":"Z Shop"
      },
      "comments":[
        {
          "userName":"Giang",
          "comment":"Viền kim loại dễ trầy quá,ai có thói quen cầm 1 tay sẽ rất mỏi ngón tay út.pin nóng nhanh hết pin khi sử dụng 4g(thua con 6s của mình)",
          "time": "5 giờ trước"
        },
        {
          "userName":"Family hải ngoại ",
          "comment":"Hoan Hô người vợ đẹp ",
          "time": "5 giờ trước"
        },
        {
          "userName":"Phạm Bình Tiên",
          "comment":"Tuyệt vời, màn hình đẹp, xử lý cực nhanh và mượt mà. Hàng Apple thì khỏi nói rồi. Quá ngon",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphone6s",
        "url":"adayroi-iphone6s",
        "seller":"Hoàng Hà Mobile"
      },
      "comments":[
        {
          "userName":"Nguyễn Khắc Duy",
          "comment":"Hiện tại mình đang sử dụng 2 sản phẩm của apple là ip7Plus256 Black vs X 256 Gray, nói chung là rất tuyệt vời. ",
          "time": "5 giờ trước"
        },
        {
          "userName":"DuyBonanno",
          "comment":"Đẳng cấp là mãi mãi!:))",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphone6splus",
        "url":"adayroi-iphone6splus",
        "seller":"Viettel Store"
      },
      "comments":[
        {
          "userName":"Hoà",
          "comment":"Giá trên trời. Mua xách tay ngon hơn không khác gì",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphonex",
        "url":"adayroi-iphonex",
        "seller":"Cellphone S"
      },
      "comments":[
        {
          "userName":"Cu Hiệp",
          "comment":"rất tuyệt vời, mọi sản phẩm của apple đều hoàn hảo",
          "time": "5 giờ trước"
        },
        {
          "userName":"Đào Đại",
          "comment":"Quá đẳng cấp",
          "time": "5 giờ trước"
        }
      ]
    }
  ]],
  ["Tiki", [
    {
      "product": {
        "name":"iphone5se",
        "url":"tiki-iphone5se",
        "seller":"Bạch Long Mobile"
      },
      "comments":[
        {
          "userName":"Hiệp",
          "comment":"Không gì để  chê",
          "time": "5 giờ trước"
        },
        {
          "userName":"Vũ Thế Duy",
          "comment":"Dòng iphone về sau mẫu mã đẹp mắt dùng chất lượng tốt iphone X ra thay cho iphone 10",
          "time": "5 giờ trước"
        },
        {
          "userName":"Võ văn lộc",
          "comment":"Quá tuyệt vời ",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphone6s",
        "url":"tiki-iphone6s",
        "seller":"HNam Mobile"
      },
      "comments":[
        {
          "userName":"hiệp",
          "comment":"bh có tek shop",
          "time": "5 giờ trước"
        },
        {
          "userName":"Lữ hồng hiệp",
          "comment":"Hơn cả mong đợi",
          "time": "5 giờ trước"
        },
        {
          "userName":"Dũng trần",
          "comment":"Đẳng cấp mới",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphone6splus",
        "url":"tiki-iphone6splus",
        "seller":"24h Store"
      },
      "comments":[
        {
          "userName":"Hao",
          "comment":"Cc nhà nghèo nói đại apple thụt cc",
          "time": "5 giờ trước"
        },
        {
          "userName":"AL",
          "comment":"iphone đã làm thay đổi thế giới thế nào khi xuất hiện 10 năm về trước. Sau 10 năm, iphone X lại có sự quan tâm ĐẶC BIỆT trên cộng đồng thế giới, mà biết bao hãng công nghệ khác khao khát có được. Tuyệt vời!",
          "time": "5 giờ trước"
        }
      ]
    },
    {
      "product": {
        "name":"iphonex",
        "url":"tiki-iphonex",
        "seller":"Nhật Cường Mobile"
      },
      "comments":[
        {
          "userName":"Sang",
          "comment":"một bước thụt lùi của iphone",
          "time": "5 giờ trước"
        }
      ]
    }
  ]]
]);