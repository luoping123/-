# Uni-MeiYe

#### 介绍

微信小程序已经发布体验版，扫描二维码即可进入（服务器已到期，目前已暂停）

小程序包含美容预约、商品购买、视频浏览、会员储值等功能，

1. 首页下滑展示预约项目分类，设计实现了**懒加载**对每个分类进行独立的下滑加载更多项目，提高页面的加载速度和性能。

2. 接入微信小程序官方**客服**API，点击直接连接微信客服对话，可以发送图片等消息。

3. 选择预约时间和美容师进行美容预约，系统**生成二维码券码**，用于验券

4. 商品分类检索，搜索商品，搜索历史记录单个或全部删除，加入购物车，查看商品详情，提交订单支付，使用**Redis**缓存订单支付剩余时间

5. 商品支付成功后，**动态推荐**其他商品

6. 查看订单，查看商品**物流进度详情**

7. 视频讲座-**swiper切换算法**

   实现原理：利用小程序内置组件 swiper+video 来制定逻辑的方向。

   为了防止一次性加载太多视频产生卡顿，设计如下算法。

   swiper替换算法。

8. 会员充值，签到积分

9. 微信一键登录

   

小程序实机截图：

![image-20240919142905061](I:\桌面\README.assets\image-20240919142905061.png)

![image-20240919142933795](I:\桌面\README.assets\image-20240919142933795.png)

![image-20240919142952646](I:\桌面\README.assets\image-20240919142952646.png)

![image-20240919143010214](I:\桌面\README.assets\image-20240919143010214.png)

首页下滑展示预约项目分类，设计实现了**懒加载**对每个分类进行独立的下滑加载更多项目，提高页面的加载速度和性能。

![image-20240919143522772](I:\桌面\README.assets\image-20240919143522772.png)

![image-20240919143610115](I:\桌面\README.assets\image-20240919143610115.png)

接入微信小程序官方客服API，点击直接连接微信客服对话，可以发送图片等消息。

![image-20240919154635204](I:\桌面\README.assets\image-20240919154635204.png)

选择预约时间段，选择美容师提交订单进行预约

![image-20240919143859421](I:\桌面\README.assets\image-20240919143859421.png)

支付预约订单

![image-20240919143924526](I:\桌面\README.assets\image-20240919143924526.png)

![image-20240919143933145](I:\桌面\README.assets\image-20240919143933145.png)

系统生成二维码券码，用于商家核验。

![image-20240919154811100](I:\桌面\README.assets\image-20240919154811100.png)

商品购买

![image-20240919154837377](I:\桌面\README.assets\image-20240919154837377.png)

支持搜索商品，保存搜索历史，且历史可以单独和全部删除

![image-20240919154925076](I:\桌面\README.assets\image-20240919154925076.png)

商品详情页

![image-20240919155036199](I:\桌面\README.assets\image-20240919155036199.png)

购物车页面

![image-20240919161850452](I:\桌面\README.assets\image-20240919161850452.png)

提交订单页面

![image-20240919161908217](I:\桌面\README.assets\image-20240919161908217.png)

支付，使用Redis缓存订单支付剩余时间

![image-20240919161946020](I:\桌面\README.assets\image-20240919161946020.png)

支付成功之后动态推荐其他商品，这里是根据商品价格推荐的

![image-20240919162055002](I:\桌面\README.assets\image-20240919162055002.png)

![image-20240919162110628](I:\桌面\README.assets\image-20240919162110628.png)

![image-20240919162232829](I:\桌面\README.assets\image-20240919162232829.png)

快递物流信息查看

![image-20240919163200395](I:\桌面\README.assets\image-20240919163200395.png)

![image-20240919163222035](I:\桌面\README.assets\image-20240919163222035.png)

视频浏览-swiper替换算法：

实现原理：利用小程序内置组件 swiper+video 来制定逻辑的方向[11]。

为了防止一次性加载太多视频产生卡顿，设计如下算法。

swiper替换算法：

设定swiepr-item数量为4，也就是在swiper里面同时展示4个video，避免过多导致页面卡顿。

例： (假设数据请求一次获取4组数据)

[now, new, new, new]   

数据首次加载，将数据放置swiper盒子中

[old, now, new, new]   

向下滑动第一次(手指向下滑动,也就是看下一个视频)

[new, old, now, new]  

向下滑动第二次，也就是在swiper滑动到第三个的时候，启用轮循

[new, new, old, now]  

启用轮循之后，每次下滑都会将swiepr内的当前的swiper-item的未来第二个swiper-item替换。

关于衔接滑动：

主要作用

阻止swiper在首次加载的时候向上滑，导致滑动到下标为3的swiepr-item上。

![image-20240919163324816](I:\桌面\README.assets\image-20240919163324816.png)

会员充值

![image-20240919163339334](I:\桌面\README.assets\image-20240919163339334.png)

签到积分

![image-20240919163412548](I:\桌面\README.assets\image-20240919163412548.png)

一键登录

#### 软件架构

本系统研究的是基于微信小程序的美业智慧平台，美业客户的微信小程序实现服务预约、商品销售、健康讲座和会员管理的功能，采用Spring Boot框架构建后台，用IDEA作为开发工具，使用腾讯云服务器，Restful风格编写后台接口，在服务器上部署，微信小程序调用后台API接口进行数据交互。美业商家的CMS后台管理系统，采用Vue、Element UI、RuoYi和Spring Boot开发。系统架构如图所示。

![img](I:\桌面\README.assets\clip_image010.gif)





目录

[1 引言 1](#_Toc103525047)

[1.1 课题背景及意义 1](#_Toc103525048)

[1.2 国内外研究现状 2](#_Toc103525049)

[1.3 本文目标与主要内容 3](#_Toc103525050)

[2 需求分析 4](#_Toc103525051)

[2.1 系统概况 4](#_Toc103525052)

[2.2 系统需求分析 4](#_Toc103525053)

[2.3 可行性研究 7](#_Toc103525054)

[2.4 系统用例分析 8](#_Toc103525055)

[3 系统设计 10](#_Toc103525056)

[3.1 总体设计 10](#_Toc103525057)

[3.2 详细设计 10](#_Toc103525058)

[3.2.1 数据库概念模型设计. 11](#_Toc103525059)

[3.2.2 数据库逻辑模型结构设计. 12](#_Toc103525060)

[3.2.3 核心功能设计. 15](#_Toc103525061)

[4 系统实现 20](#_Toc103525062)

[4.1具体功能实现 20](#_Toc103525063)

[4.1.1 首页功能实现. 21](#_Toc103525064)

[4.1.2 美容预约功能模块实现. 22](#_Toc103525065)

[4.1.3 视频讲座页面功能模块实现. 23](#_Toc103525066)

[4.1.4 商品销售功能模块实现. 26](#_Toc103525067)

[4.1.5 会员卡功能模块实现. 27](#_Toc103525068)

[4.1.6 微信登录功能实现. 28](#_Toc103525069)

[4.2 系统部署 29](#_Toc103525070)

[5 系统测试 30](#_Toc103525071)

[5.1 系统测试目的 30](#_Toc103525072)

[5.2 测试用例 30](#_Toc103525073)

[5.3 测试结果 32](#_Toc103525074)

[结束语 33](#_Toc103525075)

[参考文献 34](#_Toc103525076)

[致谢 35](#_Toc103525077)

 

 



# 1 引言

## 1.1 课题背景及意义

随着经济水平的提升，各国人们在美容、美发、美甲、按摩、身体皮肤护理等方面的消费越来越多。以英国为例，根据某机构对2000名英国妇女展开调查的结果显示，英国一位女性平均每年用在美发行业的消费支出高达290英镑，以3271万的英国女性总数估算，英国女性在美发行业消费支出高达95亿英镑[1]。

可见，全球美容美发行业市场前景依旧可期，规模将稳步扩大。以美国为例，根据SBDCNet预测，2017-2022年美国美容行业的收入每年会以3.3%的速度增长，预计到2022年达到58.0亿美元。虽然国外美容美发行业大多趋于成熟，但发展中国家可增长空间巨大，未来全球美容美发行业在发展中国家带动下将保持稳定增长[1]。

美容行业虽然有很多的客户群，但也有很多的行业痛点，这些痛点往往让商家和客户难以应对。

（1）客户的流量无法控制，尤其是对于一些特殊的节日，更是人满为患，而且传统长时间多程序的美业对于消费主力的职场女性来讲，根本没有足够的时间去享受服务；

（2）客户本身需求不明，商家沟通较为费时,顾客缺乏对行业的信任[2]；

（3）优秀、可靠的美容美发师寻找困难；

（4）电话预约信息获取有限;

（5）会员办理、储值、查询不便难经营；

（6）现金消费无数据；

（7）盈利模式单一等诸多问题都是商家与客户的痛点[3]。

为解决以上问题，本课题研究的是基于微信小程序的美业智慧平台设计与实现，还具有以下优势：

（1）使用Spring Boot、Vue、RuoYi、uni-app、uView等现有框架和集成功能组件，极大的降低了系统开发和使用成本。

（2）使用Spring Boot、Vue、RuoYi、Element UI等框架技术开发CMS内容管理系统，让美业商户可视化地管理各种内容信息。

（3）集美容预约、商城购物、浏览视频、会员等功能为一体，打通美容行业，匹配美容客户需求。

## 1.2 国内外研究现状

安卓应用市场上关于（医疗）美容类的应用有数百种。基于对比该种类应用产品的下载次数，用户评价以及用户平均每日使用人次等方面，确定了四款（医疗）美容APP为样本，进行分析。



（1）新氧。平台模式：“社区讨论+医生问答+医生面诊”模式。核心功能：在线医生诊断脸部形态；社区讨论：美容日记分享、直播美容整形。优点：可提供多样化的服务功能，作为社区讨论，话题细分类型丰富、用户活跃度高、产品视觉和交互体验较好。缺点：工具功能过于繁多，社区功能使用不受限制，存在虚假信息[4]。

（2）更美。平台模式：“社区讨论+医疗咨询+医生点评”模式。核心功能：资讯查询真人案例在线医生问诊更美AI智能识别。优点：信息架构主要为工具功能和资讯功能，为用户提供社交和资讯服务，让用户更了解情况，降低用户消费风险。缺点：用户视觉体验方面，功能与功能之间关系的层次不突出[4]。

（3）悦美整形。平台模式：“社区讨论+美容中介+资讯宣传”模式。优点：在使用过程中，功能方面信息关联度高，综合体验感不错。缺点：主功能位置不突出，内容布局不清晰[4]。

（4）仙女酱。平台模式：“社区讨论+预约上门+多商户到店”模式。优点：可预约上门服务。缺点：部分功能存在bug，用户体验感低。

这些手机app的功能可以满足美业用户的正常使用，也有其不足之处。

（1）主功能位置不突出，内容布局混乱。如悦美APP，其问诊功能、资讯功能以及社区交流等板块混合在同一页面，处于同一分层，主功能与次功能没有区分点[4]。

（2）工具功能种类较多，没有呈现更清晰的分类。如新氧医美APP，其首页由多个小图标组成，没有将用户的需求层次合理分级，主次功能无法区分，层次混乱。应从整体去考虑其框架构建，减少用户使用过程中的困扰[4]。



## 1.3 本文目标与主要内容

本课题研究的是基于微信小程序的美业智慧平台设计与实现，包括美容预约、会员管理、商品销售、健康讲座四大功能模块。



美容预约：美业商家可以根据自身业务需求提供在线预约服务，美业客户可以自主预约选择到店服务的时间以及服务类型，也可以预约、选择自己喜欢的美容师。如此可以避免长时间排队问题，商家也完全可以根据小程序上反馈的预约信息在人手调度上做出优化管理。实现线上用户流量和线下服务的无缝对接，是美业商家提升线下实体店知名度和营销额的有效途径。美业客户可以从微信小程序中浏览、选择合适的套餐或者提前确定需求，商家不用担心与客户沟通需求时间太长的问题。

会员管理：会员管理便利，通过电子会员卡，建立与客户的会员关系，会员积分、会员特权等多项长期权益，提升用户忠诚度；在会员卡的基础上增加虚拟储值卡，引导会员预存金额，锁定消费需求，提升回头率[5]。

商品销售：美业商家可以利用微信小程序商城，售卖一些美容用品，打通美业服务链，让营业额暴增。

健康讲座：商家录制发布美容视频，推广美容健康知识，吸引客户了解服务项目。

前端采用uni-app框架、uView组件库通过Hbuild X开发工具开发微信小程序，采用HTML、CSS、JavaScript、Vue框架、RuoYi框架、Element UI组件库开发CMS后台内容管理系统，后端采用Spring Boot、MyBatis-Plus、MySQL数据库、Redis缓存数据库通过IDEA开发后台接口，组成本系统。

 

 

 



# 2 需求分析

## 2.1 系统概况

基于微信小程序的美业智慧平台主要用户是美业商家以及所有有变美需求的美业客户。为了更好地实现该系统，首先调研了安卓应用市场上关于（医疗）美容类的应用。基于对比该种类应用产品的下载次数，用户评价以及用户平均每日使用人次等方面，确定了四款（医疗）美容APP为样本，进行分析，发现存在着各种缺点问题。因此为了打通整个美业服务，让美业商家以及所有美业客户享受到更好的使用体验，需要分析目前美容行业用户的需求。

## 2.2 系统需求分析

美容行业虽然有很多的客户群，但也有很多的行业痛点，这些痛点往往让商家和客户难以应对。

（1）客户的流量无法控制，尤其是对于一些特殊的节日，更是人满为患，而且传统长时间多程序的美业对于消费主力的职场女性来讲，根本没有足够的时间去享受服务；

（2）客户本身需求不明，商家沟通较为费时；

（3）优秀、可靠的美容美发师寻找困难；

（4）电话预约信息获取有限;

（5）会员办理、储值、查询不便难经营；

（6）现金消费无数据；

（7）盈利模式单一。

根据需求分析确定了基于微信小程序的美业智慧平台应实现的功能，具体详情如下：

（1）用户登录：美业客户需要先登录系统，才能使用加入购买商品、服务预约、会员卡等功能。

（2）限时秒杀：美业客户可以对活动中的服务项目、商品进行限时秒杀抢购，享受更多优惠。

（3）商品分类：美业客户可以查看商品分类，根据分类可以快速检索到需要购买的商品。

（4）商品列表：美业用户通过商品分类，进入到商品列表页面，对商品进行进一步的查看筛选。

（5）商品详情：美业用户通过商品列表，进入到商品详情页面，查看对应的商品详情，已经登录的用户可以进行加入购物车和立即购买进一步操作。未登录的用户，会重定向到登录页面，客户登录后将返回详情页面，继续进行加入购物车或购买操作。

（6）商品搜索：美业用户可以根据商品的关键字进行商品的模糊查询，检索想要购买的商品。

（7）服务项目分类：美业用户可以通过首页下面的服务项目分类，进行分类服务的滑动选择查看。

（8）服务预约：美业用户可以对预约服务项目进行预约日期、服务项目以及美容师的选择，选择适合自己的服务项目、时间和美容师进行预约。

（9）优惠券：美业商家为了留住客户，允许美业客户使用优惠券，优惠券可以通过积分兑换获得。

（10）“逛逛”视频休闲：美业商家发布服务视频和科普视频，推送给美业客户，美业客户可以在线查看视频，提高客户对行业的认知和信任，从而达到激发客户购买欲望的目的。

（11）购物车：已经登录的美业客户可以将商品加入购物车，修改购物车中的商品数量，删除购物车里面的商品，选中多个或全选商品可以进行付款。客户也可以通过点击购物车中的商品，进入该商品的详情页面，查看商品的详细描述，并进行购买。

（12）会员卡：美业商家为了留住客户，增加客户的粘稠度，设置了会员卡系统，客户可以进行签到积分兑换商品，预存余额获得更多优惠[6]。

 

 

经过需求分析，可以得出预约服务和购买商品两大核心功能模块的逻辑流程。美业客户选择商品或服务项目，进行购买或预约，然后提交订单，进行支付。支付成功后显示订单信息。支付失败后提示继续支付，并进入订单支付倒计时。

其具体流程图如图1所示。

![img](I:\桌面\README.assets\clip_image002.gif)

图1预约服务和购买商品流程图

根据需求分析和预约服务、购买商品两大核心功能的流程图，经过分析可以进一步得出系统数据流图如图2所示。

美业客户对系统进行的不同操作，对应着不同的数据流向，为后续的数据库设计奠定了分析基础。

数据流图可以很清楚地展现出客户操作的作用效果，表达出系统内部的逻辑过程。

 

 

![img](I:\桌面\README.assets\clip_image004.jpg)

图2 系统数据流图

## 2.3 可行性研究

（1）技术可行性

本系统拟采用如下技术、框架：

微信小程序开发：uni-app框架、uView组件库等；

微信小程序数据接口API开发：Spring Boot、MyBatis-Plus、MySQL数据库、Redis数据库等；

CMS后台内容管理系统开发：HTML、CSS、JavaScript、Vue框架、RuoYi框架、Element UI组件库等。

拟采用技术均是目前发展比较完善、功能强大、易上手的框架和组件库技术，本系统基本功能的实现是可行的。

（2）经济可行性

本系统采用的技术以及开发工具均开源免费，不使用微信云开发，减少了云开发的费用花销，硬件环境容易满足，不需要额外采购；后期考虑将后端程序部署到云服务器上，腾讯云服务器新用户优惠后仅74元/年，.xyz域名8元/年，SSL证书免费认证，备案免费，因此开发本系统是可行的。

（3）操作可行性

微信小程序在微信中，如今中老年人也会使用微信，微信小程序上手快，操作简单，不需要安装即可使用，对于美业用户操作更无需担心，因此本系统是可行的。

## 2.4 系统用例分析

系统角色主要划分为美业商家和美业客户，美业商家使用PC端的Web网页CMS内容管理系统，美业客户使用微信小程序。系统主要包括美容预约、会员管理、商品销售、健康讲座四大功能模块。系统用例图如图3所示。

![img](I:\桌面\README.assets\clip_image006.jpg)

图3 系统用例图

（1）美容预约：美业商家可以根据自身业务需求提供在线预约服务，美业客户可以自主预约选择到店服务的时间以及服务类型，也可以预约、选择自己喜欢的美容师。如此可以避免长时间排队问题，商家也完全可以根据小程序上反馈的预约信息在人手调度上做出优化管理。实现线上用户流量和线下服务的无缝对接，是美业商家提升线下实体店知名度和营销额的有效途径。美业客户可以从微信小程序中浏览、选择合适的套餐或者提前确定需求，商家不用担心与客户沟通需求时间太长的问题。

（2）会员管理：会员管理便利，通过电子会员卡，建立与客户的会员关系，会员积分、会员特权等多项长期权益，提升用户忠诚度；在会员卡的基础上增加虚拟储值卡，引导会员预存金额，锁定消费需求，提升回头率。

（3）商品销售：美业商家可以利用微信小程序商城，售卖一些美容用品，打通美业服务链，让营业额暴增。

（4）健康讲座：商家录制发布美容视频，推广美容健康知识，吸引客户了解服务项目。

系统功能模块如图4所示。

![img](I:\桌面\README.assets\clip_image008.gif)

图4 系统功能模块图

**
**

# 3 系统设计

## 3.1 总体设计

本系统研究的是基于微信小程序的美业智慧平台，美业客户的微信小程序实现服务预约、商品销售、健康讲座和会员管理的功能，采用Spring Boot框架构建后台，用IDEA作为开发工具，使用腾讯云服务器，Restful风格编写后台接口，在服务器上部署，微信小程序调用后台API接口进行数据交互。美业商家的CMS后台管理系统，采用Vue、Element UI、RuoYi和Spring Boot开发。系统架构图如图5所示。

![img](I:\桌面\README.assets\clip_image010.gif)

图5 系统架构图

## 3.2 详细设计

数据库的设计是在功能模块划分的基础上对数据库表进行分析和设计。因此，我们必须首先了解需要哪些表以及每个表中有哪些字段。更重要的是确定每个表中的哪个字段是主键，以及表和表之间是否存在连接。并为每个字段确定其数据类型和长度。许多详细问题可能导致无法读取数据库表中的数据，例如此字段的长度是否可以为空。

### 3.2.1 数据库概念模型设计

数据库E-R图如图6-图8所示。

![img](I:\桌面\README.assets\clip_image012.gif)

图 6 商品模块E-R图

![img](I:\桌面\README.assets\clip_image014.gif)

图7 服务项目模块E-R图

![img](I:\桌面\README.assets\clip_image016.gif)

图8 页面内容E-R图

### 3.2.2 数据库逻辑模型结构设计

（1）视频表video，以id为主键，包含视频独有id、视频拥有者名称、头像、标题、描述、初始状态、喜欢数量、评论数量、视频地址、评论内容、是否播放、是否显示封面、是否显示进度条和是否播放音频。

（2）九宫格导航表grid_cate，以id为主键，包含图标地址、名称、跳转类型和链接地址。

（3）滚动公告表notice，以id为主键，包含滚动文字和是否显示。

（4）轮播图表swiper，以id为主键，包含图片地址、跳转类型和链接地址。

页面内容数据库设计，便于美业商家进行微信小程序端的内容管理，美业商家可以进行修改微信小程序端的页面内容，包括视频、九宫格导航、滚动通知公告和首页轮播。

数据库模型图如图9和图10所示。

 

![img](I:\桌面\README.assets\clip_image018.jpg)

图9 数据库模型图（1）

（5）商品表goods，以id为主键，用于存放商品数据。

（6）商品类别表goods_cate，以id为主键，用于存放分类数据。

（7）为了便于商品属性的扩增，设置了商品属性表goods_attribute，以id为主键，包含商品属性名、属性值和该属性值对应的库存量以商品id为外键。

（8）为方便存储商品详情数据，设置商品详情表goods_details，以id为主键，包含商品详情轮播图片或视频地址、轮播图类型、商品价格栏目类型、运费和详情富文本以商品id为外键。

（9）商品订单表goods_order，以id为主键，包含订单编号、留言、订单总积分、订单总金额、实际金额、优惠券减少金额、订单状态、付款方式、付款时间、创建订单时间、收件人姓名、收件人地址、收件人电话、是否超时未支付和逻辑删除，以用户id为外键建立一对多的联系。

（10）为了实现商品订单和商品的多对多关系，创建商品订单连接表goods_link_order，以id为主键，包含订单编号、商品id、商品数量和商品属性，以订单编号、商品id为外键。

（11）为了实现商品与客户评论的多对多关系，创建客户商品评价表goods_evaluate，以id为主键，包含用户id、商品id、评价图片或视频地址、评价资源类型、评价时间、评价类型、评价内容、评价星级和是否置顶，以用户id、商品id为外键。

（12）客户信息表user，以id为主键，包含微信登录openId、姓名、性别、年龄、用户类型、地址、头像、电话、账号、密码、会员卡id、余额、积分、优惠券id、创建时间和最后登录时间。

![img](I:\桌面\README.assets\clip_image020.jpg)

图10 数据库模型图（2）

（13）服务项目表service_item，以id为主键，包含服务名、二级服务名、图片、原价、现价、类别id和是否为秒杀项目，以类别id为外键。

（14）服务项目分类表service_item_cate，以id为主键，包含分类名、是否启用和是否热卖。

（15）服务项目订单表service_order_order，以order_id为主键，包含二维码号码、备注、创建订单时间、服务项目id、美容师id、客户id、到期时间、服务方式、预约时间、订单总价、实付款、付款方式、付款时间和订单状态，以服务项目id、美容师id、客户id为外键实现一对多的实体关系。

（16）美容师表beautician，以id为主键，包含美容师姓名、性别、年龄、地址、电话、照片和评分总星级。

（17）为了实现美容师和服务项目之间的多对多关系，建立美容师项目表beautician_service，以id为主键，以服务项目id和美容师id为外键。

（18）为了更好地实现美容师预约时间分配，建立美容师预约时间表beautician_time，以id为主键，包含美容师id、可预约时间和当前时间剩余可预约数量，以美容师id为外键。

（19）积分兑换记录表integral_bill，以id为主键，包含客户id、标题、积分值、获得 or 兑换和记录时间，以客户id为外键。

（20）钱包账单表wallet_bill，以id为主键，包含客户id、标题、金额、重置或消费和记录时间，以客户id为外键。

### 3.2.3 核心功能设计

（1）微信小程序可以调用微信登录接口，实现微信登录，但需要Spring Boot技术开发的后端服务器配合，这是第一次前后端通信。本系统采用JWT加密生成token并与从微信登录API中获取到的用户基本信息userInfo一同存储到Redis、MySQL数据库和微信小程序缓存中，作为用户登录标识。当美业客户请求需要登录才可以访问的页面时，会首先验证token和userInfo存在性和正确性，如果验证失败，则无法进入页面，并将页面重定向至登录页面，引导用户进行登录。如果验证token和userInfo成功，将允许用户进入该页面。

美业客户授权微信登录后，系统将会返回至原来请求的页面，美业客户继续进行后续操作即可。系统会将用户的头像和昵称显示在会员卡页面中对应的位置。

微信登录时序图如图11所示。

 

![img](I:\桌面\README.assets\clip_image022.gif)

图11 微信登录时序图

（2）预约服务核心功能设计，美业客户点击预约tabbar，进入预约项目选择页面，选择服务项目后，点击预约按钮，进入预约时间和美容师选择。本系统考虑到在一个时间范围内，一个美容师可以服务的数量问题，在数据库表设计时添加预约时间内美容师可预约数量字段[7]。客户在美业微信小程序，选择预约时间后，小程序向Spring Boot后端服务发起数据请求，Spring Boot后端操作数据库，检索该服务项目，该时间内可预约数量大于0的美容师，并返回给美业微信小程序，美业微信小程序前端获取到数据，并显示可预约美容师，否则显示预约满[8]。

美业商家可以在后台内容管理系统中，根据美容师的情况进行美容师动态排班，而进行的排班会在微信小程序中进行动态显示。

预约服务时序图如图12所示。

![img](I:\桌面\README.assets\clip_image024.gif)

图12 预约服务时序图

（3）购买商品核心功能设计，美业客户通过点击首页导航按钮，进入到商品分类检索页面，可以按类别检索某类商品，也可以通过顶部搜索栏进行关键字查询商品，搜索栏设有搜索历史，可通过搜索点击搜索历史进行搜索。在检索到商品后，客户点击立即购买按钮，进入商品详情页面，根据传过来的商品id，请求Spring Boot后端接口，获取该id的商品信息，并显示[9]。客户可选择加入购物车或立即购买，点击立即购买后，选择商品属性和购买数量后，跳转到订单支付页面，进行订单支付，时序图如图13所示。

![img](I:\桌面\README.assets\clip_image026.gif)

图13 购买商品时序图

客户也可通过购物车或为您推荐栏目进入商品详情页面，进行购买及后续操作，搜索栏目设有搜索历史删除功能，可以长按删除某个搜索历史，或全部删除。

本系统采用Spring Boot框架和MyBatis-Plus进行后端接口开发，MyBatis-Plus提供强大的功能封装接口和类，让数据增删改查接口编写变得非常便捷，只需要继承或实现MyBatis-Plus提供的接口和类即可[10]。采用Lombok提供的@Data注解使实体类开发省去繁琐的get和set方法编写。本文以服务项目为例，简要概述后端接口类继承模式，其类图如图14所示。

![img](I:\桌面\README.assets\clip_image028.gif)

图14 SpringBoot后端类图

购买商品订单状态会根据客户和商家的不同操作，进行相应的变化，状态图如图15所示。

![img](I:\桌面\README.assets\clip_image030.gif)

图15 商品订单状态图

服务项目订单状态与购买商品订单状态相似，只是待发货状态改为待使用状态，移除了待收货状态。因此本文将不再进行赘述。

 

 

 

**
**

# 4 系统实现

本系统研究的是基于微信小程序的美业智慧平台，美业客户的微信小程序实现服务预约、商品销售、健康讲座和会员管理的功能，采用Spring Boot框架构建后台，用IDEA作为开发工具，使用腾讯云服务器，Restful风格编写后台接口，在服务器上部署，微信小程序调用后台API接口进行数据交互。美业商家的CMS后台管理系统，采用Vue、Element UI、RuoYi和Spring Boot开发。使用MyBatis-plus极大简化了代码的编写。

## 4.1具体功能实现

根据系统设计，uni-app前端项目结构和Spring Boot后端项目结构，如图16和图17所示。

![img](I:\桌面\README.assets\clip_image032.jpg)     ![img](I:\桌面\README.assets\clip_image034.jpg)

图16前端项目结构            图17后端项目结构

### 4.1.1 首页功能实现

首页界面如图18所示。

![img](I:\桌面\README.assets\clip_image036.gif)

图18 首页界面图

![文本框: @GetMapping("/getservicelistlistbycate") public Result<Object> getServiceListListByCate(){     //创建分页对象     Page<ServiceItem> page = new Page<>(1, 10);     //获取服务项目分类  列表     List<ServiceItemCate> tabsList=serviceItemCateService.list();     List<Map<String,Object>> serviceListList =new ArrayList<>();     for(ServiceItemCate cate : tabsList){          //创建查询条件对象         QueryWrapper<ServiceItem> wrapper = new QueryWrapper<>();         if (!"".equals(cate.getId())) wrapper.lambda().eq(ServiceItem::getCateId, cate.getId());         Page<ServiceItem> ServicesPage = serviceItemService.page(page, wrapper);         Map<String,Object> map=new HashMap<>();          map.put("records",ServicesPage.getRecords());         map.put("total",ServicesPage.getTotal());         map.put("pageCurrent",1);          map.put("pageSize",10);         serviceListList.add(map);     }     return new Result<>(HttpStatus.OK.value(),"success",serviceListList); }  ](I:\桌面\README.assets\clip_image037.gif)

服务项目分类，使用uView组件库的u-tabs组件和swiper组件，组合使用，达到滑动切换类别的目标，在home页面的onLoad事件中，获取到每个分类的前10条分页数据并显示。美业客户滑动浏览不同服务项目分类时，会显示该分类中的数据。当客户上划到底部时，触发上拉加载事件，根据当前分类id和分页配置，请求Spring Boot后台，获取该分类的下一页数据并用数组展开表达式添加到总数据中。

为了解决一次性加载太多数据而导致小程序页面卡顿的问题，本系统为每个分类项目单独设置分页配置，上划加载下一页时，只加载当前分类的下一页，其他分类保持不变，客户滑动到不同的分类时，获取到该分类的分页配置，进行请求即可实现。

### 4.1.2 美容预约功能模块实现

预约功能模块，微信小程序界面如图19所示。

![img](I:\桌面\README.assets\clip_image039.gif)

图19 预约实现界面

 

![文本框: @PutMapping("/updateServiceOrdeStatusBuySuccessByOrderId") @Transactional//事务 public Result<Object> updateServiceOrdeStatusBuySuccessByOrderId(@RequestBody ServiceOrderOrder serviceOrderOrder){      ServiceOrderOrder serviceOrderOrder1= 	 (ServiceOrderOrder) redisTemplate.opsForValue().get(serviceOrderOrder.getOrderId());     serviceOrderOrder1.setRealPay(serviceOrderOrder.getRealPay())             .setPayType(serviceOrderOrder.getPayType())             .setPayTime(serviceOrderOrder.getPayTime())             .setOrderStatus(serviceOrderOrder.getOrderStatus())             .setEndDate(serviceOrderOrder.getEndDate())             .setQrcodeNumber(RandomIdUtil.generateUniqueKey());//生成二维码号码     //更新订单信息     orderOrderService.update(serviceOrderOrder1,new UpdateWrapper<ServiceOrderOrder>().lambda().eq(ServiceOrderOrder::getOrderId,serviceOrderOrder1.getOrderId()));     //获取到美容师——时间 信息     BeauticianTime beauticianTime=beauticianTimeService.getOne(             new QueryWrapper<BeauticianTime>().lambda().eq(BeauticianTime::getBeauticianId,serviceOrderOrder1.getBeauticianId())                     .eq(BeauticianTime::getBeauticianTime,serviceOrderOrder1.getServiceOrderDatetime()));     int number=beauticianTime.getNumber();     //让该美容师的该时间的可预约数-1     beauticianTime.setNumber(number-1);     beauticianTimeService.updateById(beauticianTime);     return new Result<>(HttpStatus.OK.value(),"success",""); }  ](I:\桌面\README.assets\clip_image040.gif)

### 4.1.3 视频讲座页面功能模块实现

实现原理：利用小程序内置组件 swiper+video 来制定逻辑的方向[11]。

为了防止一次性加载太多视频产生卡顿，设计如下算法。

swiper替换算法：

设定swiepr-item数量为4，也就是在swiper里面同时展示4个video，避免过多导致页面卡顿。

例： (假设数据请求一次获取4组数据)

[now, new, new, new]   

数据首次加载，将数据放置swiper盒子中

[old, now, new, new]   

向下滑动第一次(手指向下滑动,也就是看下一个视频)

[new, old, now, new]  

向下滑动第二次，也就是在swiper滑动到第三个的时候，启用轮循

[new, new, old, now]  

启用轮循之后，每次下滑都会将swiepr内的当前的swiper-item的未来第二个swiper-item替换。

关于衔接滑动：

主要作用

阻止swiper在首次加载的时候向上滑，导致滑动到下标为3的swiepr-item上。

视频浏览界面如图20和图21所示。

![img](I:\桌面\README.assets\clip_image042.jpg)   ![img](I:\桌面\README.assets\clip_image044.jpg)

图20 视频界面（1）           图21视频界面（2）

 

 

Spring Boot后端接口核心代码：

![文本框: @PostMapping("/getVideoList") public Result<Object> getVideoList(@RequestBody String info){     return new Result<>(HttpStatus.OK.value(),"success",videoService.list()); }  ](I:\桌面\README.assets\clip_image045.gif)

前端JavaScript核心预加载代码：

![文本框: get(){ // 引入后端请求数据 	uni.request({     		url: 'https://www.shichengtai.xyz:8088/sct/api/meiye/video/getVideoList',       	method: 'POST',       	data:{         		info: 'get_video'       	},       	success: (res) => {         		var msg = res.data.data         		// 把视频添加到视频列表         		for (let i = 0; i < msg.length; i++) {           		this.dataList.push(msg[i])         		}         		// 播放当前视频         		setTimeout(()=>{           		this.dataList[this.k].isplay = false           		this.dataList[this.k].state = 'play'           	uni.createVideoContext(this.dataList[this.k].videoId,this).play()           		this.dataList[this.k].playIng = true         		},200)         		// start - 预加载开始         		var p = this.k         		++p         		setTimeout(()=>{           		uni.createVideoContext(this.dataList[p].videoId,this).play()        		 },20)         		clearTimeout(this.timeout)         		this.timeout = setTimeout(()=>{           		uni.createVideoContext(this.dataList[p].videoId,this).seek(0)           		uni.createVideoContext(this.dataList[p].videoId,this).pause()           		console.log('预加载第' + (p + 1) + '个视频：' + this.dataList[p].videoId)         		},1500)         		// end - 预加载结束       	}     }) }, ](I:\桌面\README.assets\clip_image046.gif)

 

### 4.1.4 商品销售功能模块实现

商品销售功能前端核心页面如图22所示。

![img](I:\桌面\README.assets\clip_image048.jpg)

图22 商品销售核心页面

后端核心代码：

![文本框: @PostMapping("/saveGoodsOrderToRedis") public Result<Object> saveGoodsOrderToRedis(@RequestBody GoodsOrderDto goodsOrderDto){          redisTemplate.opsForValue().set(goodsOrderDto.getRedisKey(), goodsOrderDto, 5L, TimeUnit.MINUTES);         return new Result<>(HttpStatus.OK.value(),"success",""); }  @PutMapping("/updateGoodsOrdeStatusBuySuccessByOrderId") @Transactional//事务 public Result<Object> updateGoodsOrdeStatusBuySuccessByOrderId(@RequestBody GoodsOrder goodsOrder){      //修改订单信息     goodsOrderService.update(goodsOrder,new QueryWrapper<GoodsOrder>().lambda().eq(GoodsOrder::getGoodsOrderId,goodsOrder.getGoodsOrderId()));     return new Result<>(HttpStatus.OK.value(),"success",""); } ](I:\桌面\README.assets\clip_image049.gif)

Spring Boot有事务注解@Transactional，利用该注解，可以实现订单操作的原子性，对多表的新增或修改实现同时成功或同时失败。

### 4.1.5 会员卡功能模块实现

会员卡功能前端核心界面如图23所示。

![img](I:\桌面\README.assets\clip_image051.jpg)

图23 会员核心界面

![文本框: @PostMapping("/updateSignInToRedis") @Transactional//事务 public Result<Object> updateSignInToRedis(@RequestParam(value = "signInKey",required = false) String signInKey, @RequestParam(value = "signInVo",required = false) SignInVo signInVo){     boolean isExist= redisTemplate.hasKey(signInKey);     if(isExist) redisTemplate.opsForHash().delete(signInKey);     redisTemplate.opsForHash().put(signInKey,"signNow",signInVo.getSignNow());     redisTemplate.opsForHash().put(signInKey,"signNext",signInVo.getSinNext());     redisTemplate.opsForHash().put(signInKey,"signNumber",signInVo.getSinNumber());     String [] strr=signInKey.split("-");     Long id=Long.parseLong(strr[1]);     User user=userService.getById(id);     user.setIntegral(user.getIntegral()+signInVo.getSinNumber());     userService.updateById(user);     return  new Result<>(HttpStatus.OK.value(),"success",""); }  ](I:\桌面\README.assets\clip_image052.gif)

使用Redis数据库实现签到功能，使数据的读写速度得到很大的提升，签到的算法逻辑描述如下：

if 今天==签到的下一天，说明：今天未签到并且属于连续签到

else if 今天！==签到日期，说明：今天未签到，而且要从第一天开始算起

else if 今天==签到日期，说明：今天已经签到

### 4.1.6 微信登录功能实现

![img](I:\桌面\README.assets\clip_image054.jpg)

图24 登录界面图

![文本框: @Override public Result<Object> login(UniDetail wx) {     if (!checkToken(wx.getCode()))         return new Result<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "success", null);      String code = String.valueOf(redisTemplate.opsForValue().get(wx.getCode()));     UniOpenData openData = JSONUtil.toBean(code, UniOpenData.class);      String userInfo = this.getUserInfo(wx, openData.getSession_key());     UniUserDto userDto = JSONUtil.toBean(userInfo, UniUserDto.class);      User user = userService.getOne(new QueryWrapper<User>().lambda().eq(User::getOpenId, openData.getOpenid()));     if (ObjectUtil.isNull(user)) {         System.out.println("用户第一次使用存储用户数据");         userService.save(new User()                 .setOpenId(openData.getOpenid())                 .setType(UserType.WECHAT_APPLET.getKey())                 .setAvatarUrl(userDto.getAvatarUrl())                 .setGender(userDto.getGender())                 .setName(userDto.getNickName())                 .setAddress(userDto.getCountry() + userDto.getProvince() + userDto.getCity())                 .setCreateTime(new Timestamp(System.currentTimeMillis()))                 .setLastLoginTime(new Timestamp(System.currentTimeMillis())));     } else {         //否则更新         userService.update(new User()  ](I:\桌面\README.assets\clip_image055.gif)

![文本框: .setAvatarUrl(userDto.getAvatarUrl())                         .setGender(userDto.getGender())                         .setName(userDto.getNickName())                         .setLastLoginTime(new Timestamp(System.currentTimeMillis()))                         .setAddress(userDto.getCountry() + userDto.getProvince() + userDto.getCity()), new UpdateWrapper<User>().lambda().eq(User::getOpenId, user.getOpenId()));     }     //生成token     String token = genToken(openData.getOpenid());     //获取User对象，用于获取userId     User user1= userService.getOne(new QueryWrapper<User>().lambda().eq(User::getOpenId,openData.getOpenid()));     UniUserVo userVo = new UniUserVo();     BeanUtils.copyProperties(user1, userVo);     userVo.setNickName(user1.getName());     userVo.setToken(token);     userVo.setUserId(user1.getId());     log.info("用户登录:用户openId:{},token:{}", user.getOpenId(), token);     return new Result<>(HttpStatus.OK.value(), "success", userVo); }  ](I:\桌面\README.assets\clip_image056.gif)

微信小程序可以直接调用微信登录API进行登录，uni.getUserProfile()用于获取用户的基本信息，包括头像、昵称、所在地等信息，uni.login()用于获取登录凭证（code），进而换取用户在当前小程序的唯一标识（openid），再通过JWT生成token，存储到小程序缓存和MySQL数据库中[12]。

## 4.2 系统部署

本系统部署图如图25所示。

![img](I:\桌面\README.assets\clip_image058.gif)

图25部署图

# 5 系统测试

为保证基于微信小程序的美业智慧平台的设计与实现的质量和可靠性，系统测试是一个重要的步骤，目的在于找出系统在设计与开发时可能出现的缺陷与错误，验证系统是否满足用户的需求。

## 5.1 系统测试目的

通过系统测试验证系统是否符合用户需求，验证数据库的连接，逻辑，删除，插入数据是否正常进行。越早发现问题，就越容易解决问题，因此进行系统测试是必要的。

## 5.2 测试用例

商品搜索测试用例如表1所示。

表1商品搜索测试用例



| 项目软件 | 基于微信小程序的美业智慧平台                         | 程序版本      | v1.0                           |          |          |      |
| -------- | ---------------------------------------------------- | ------------- | ------------------------------ | -------- | -------- | ---- |
| 功能模块 | 商品搜索                                             | 编制人        | 史承泰                         |          |          |      |
| 功能特性 | 对商品进行检索，并存储搜索记录                       |               |                                |          |          |      |
| 测试目的 | 验证商品是否正确检索，搜索历史记录的删除是否正常     |               |                                |          |          |      |
| 测试数据 | 搜索内容=美；搜索内容=精华；搜索内容=/；删除搜索记录 |               |                                |          |          |      |
| 操作步骤 | 操作描述                                             | 数据          | 期望结果                       | 实际结果 | 测试状态 |      |
| 1        | 输入搜索内容                                         | 搜索内容=美   | 检索出所有名称包含‘美’的商品   | 成功检索 | 正常     |      |
| 2        | 输入搜索内容                                         | 搜索内容=精华 | 检索出所有名称包含‘精华’的商品 | 成功检索 | 正常     |      |
| 3        | 输入搜索内容                                         | 搜索内容=/    | 未检索到                       | 未检索到 | 正常     |      |
| 4        | 长按搜索记录  进行删除                               |               | 删除成功                       | 删除成功 | 正常     |      |
|          |                                                      |               |                                |          |          |      |

 

美容预约功能测试用例如表2所示。

表2美容预约功能测试用例



| 项目软件 | 基于微信小程序的美业智慧平台                                 | 程序版本          | v1.0                             |                                  |          |      |
| -------- | ------------------------------------------------------------ | ----------------- | -------------------------------- | -------------------------------- | -------- | ---- |
| 功能模块 | 美容预约                                                     | 编制人            | 史承泰                           |                                  |          |      |
| 功能特性 | 选择服务项目、预约时间、美容师进行预约                       |                   |                                  |                                  |          |      |
| 测试目的 | 验证预约时间和美容师显示的正确性，验证支付流程的正确性       |                   |                                  |                                  |          |      |
| 测试数据 | 预约时间=今日；预约时间=明日；   支付状态=成功支付；支付状态=取消支付 |                   |                                  |                                  |          |      |
| 操作步骤 | 操作描述                                                     | 数据              | 期望结果                         | 实际结果                         | 测试状态 |      |
| 1        | 预约时间选择  今日进行预约                                   | 预约时间=今日     | 依据当前时间，最早显示下一个小时 | 依据当前时间，最早显示下一个小时 | 正常     |      |
| 2        | 预约时间选择  明日进行预约                                   | 预约时间=明日     | 显示全部时间                     | 显示全部时间                     | 正常     |      |
| 3        | 支付成功                                                     | 支付状态=成功支付 | 显示订单  二维码                 | 显示订单  二维码                 | 正常     |      |
| 4        | 支付失败                                                     | 支付状态=取消支付 | 跳转到支付页面，并倒计时30分钟   | 跳转到支付页面，并倒计时30分钟   | 正常     |      |
|          |                                                              |                   |                                  |                                  |          |      |

 

 

 

签到功能测试用例如表3所示。

表3签到功能测试用例



| 项目软件 | 基于微信小程序的美业智慧平台                                 | 程序版本                        | v1.0                         |                              |          |      |
| -------- | ------------------------------------------------------------ | ------------------------------- | ---------------------------- | ---------------------------- | -------- | ---- |
| 功能模块 | 签到                                                         | 编制人                          | 史承泰                       |                              |          |      |
| 功能特性 | 签到获得积分，连续签到可得更多积分                           |                                 |                              |                              |          |      |
| 测试目的 | 验证签到功能的正确性，是否符合连续签到逻辑                   |                                 |                              |                              |          |      |
| 测试数据 | 签到状态=今日未签到，昨日已签到；签到状态=今日昨日均未签到；   签到状态=今日已签到 |                                 |                              |                              |          |      |
| 操作步骤 | 操作描述                                                     | 数据                            | 期望结果                     | 实际结果                     | 测试状态 |      |
| 1        | 连续签到                                                     | 签到状态=今日未签到，昨日已签到 | 点击签到后，获得连续签到积分 | 点击签到后，获得连续签到积分 | 正常     |      |
| 2        | 签到中断                                                     | 签到状态=今日昨日均未签到       | 点击签到，为首次签到         | 点击签到，为首次签到         | 正常     |      |
| 3        | 已签到                                                       | 签到状态=今日已签到             | 显示今日  已签到             | 显示今日  已签到             | 正常     |      |
|          |                                                              |                                 |                              |                              |          |      |

## 5.3 测试结果

通过测试系统商品搜索、美容预约和签到等功能，检验商品检索和删除搜索历史功能的正确性、美容预约时间显示和订单支付的正确性、签到功能的逻辑正确性，并及时发现系统可能出现的一些问题，从而进一步完善系统功能。

通过本次系统测试，发现了本系统中存在的一些问题，挖掘了更深层次的隐患，消除了系统故障，使本系统的业务逻辑功能更加流畅，增强了用户体验。

 

# 结束语

本系统实现了美容预约、商品购买、视频浏览和会员签到功能，为美业用户提供丰富的美容体验。通过使用本系统，美业用户，可以在线浏览美容视频提高美容知识、增强对美容的认识；可以在线预约美容服务，选择足不出户的上门服务或到店服务，享受互联网的便捷；可以购买美容商品，满足其他美容需求；进行会员签到赚取积分兑换商品，预存金额尽享更多优惠。

本系统采用MyBatis-Plus与Spring Boot框架结合，极大地简化了后端代码的编写，使用RestFul风格编写请求，让请求见名知意，使用JWT生成token和RedisTemplate操作Redis数据库，让代码更加简洁，提高开发效率。uni-app框架和uView组件的使用，让前端页面更美观，让代码更简洁明了，让开发效率更高。

通过该系统的设计和实现，我第一次接触前后端分离，第一次做全栈开发，真正感悟到，面面俱到很难，我一直抵触的前端，一直困扰着我，导致我走了很多弯路。相比后端，前端耗费了我太长的时间和精力，后续不光要学习后端，也要学习一些前端技巧，弥补短板。

完成这次毕设的时间和耗费的精力比我预期要长很多，单是从SSM框架到Spring Boot框架的学习时间就花费了半个多月时间，再加上微信小程序和uniapp的学习，大概一共花费了一个多月时间，还有JWT生成token、Redis数据库、微信登录等零散的知识，几乎一直在学习，虽然很辛苦，也曾多次想要逃避，但最终还是坚持了下来，也从中学到了很多东西，了解了很多开源项目和框架，懂得了要学会站在巨人的肩膀上，避免重复“造轮胎”。

由于篇幅原因，系统部分功能实现细节本文没有描述。后续本系统将会继续完善，考虑发布上线，并邀请美容行业客户进行体验，并进行改进完善。



参考文献

[1]   前瞻产业研究院.全球美容美发行业市场现状与发展前景分析[EB/OL]. (2019-05-09). [2022-05-13]. https://www.toutiao.com/article/6688917338722402823/?wid=1652423908326.



[2]   周飞飞,于振冰.基于信任危机背景下的传统美容行业营销策略分析——以A美容会所为例[J].中国商论, 2022, (03): 44-7.

[3]   亓发芝,顾建英.当前我国医疗美容行业存在的问题与对策[J].中国医疗美容, 2021, 11(07): 1-3.

[4]   汪涛,琚晓芸.基于用户体验的医疗美容APP交互界面设计研究[J].大众文艺, 2021, (04): 74-5.

[5]   佳琪.超市微信营销解决方案 智慧商超微信营销解决方案[EB/OL]. (2020-04-25). [2022-05-13]. https://www.docin.com/p-2350265310.html.

[6]   索朗拉姆.互联网平台签到功能下积分的会计处理[J].会计之友, 2017, (11): 110-2.

[7]   连钦兴,盘炜生,白伟华.基于微信小程序的场馆预约系统设计[J].河南科技, 2021, 40(31): 9-11.

[8]   孙剑,程建军.基于微信小程序的医院远程挂号系统设计[J].电子设计工程, 2021, 29(22): 51-4.

[9]   田松涛,段元梅.基于SpringBoot的线上商城平台设计[J].无线互联科技, 2022, 19(01): 56-7.

[10] 饶仕琪.Spring Boot应用开发实战[M].北京:清华大学出版社,2021:68-75.

[11] 罗阳刚.短视频微信小程序的设计与实现[D].华中科技大学, 2019:5-10.

[12] ZNYSYS520.微信小程序获取openid[EB/OL]. (2018-08-21). [2022-05-13]. https://blog.csdn.net/ZNYSYS520/article/details/81903437?spm=1001.2014.3001.5501.
