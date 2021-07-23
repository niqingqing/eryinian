/**
 * Created by chengtao on 2018/6/22/022.
 */

var MAP_CONF = [
    {
        key:'marker_size',
        value:60,
        des:lang['marker_size']
    },
    {
        key:'disappear_limit',
        value:2,
        des:lang['disappear_limit']
    },
    {
        key:'cfg_pos_wait',
        value:30,
        des:lang['cfg_pos_wait']
    },
    {
        key:'cfg_last_ref',
        value:10,
        des:'TDOAv2中参考点与上一次定位点之间的距离限制'
    },
    {
        key:'cfg_dimension',
        value:'ALL',
        des:'0D:零位定位，1D:1维定位，2D：2维定位，ALL：混合定位（默认：ALL）'
    },
    {
        key:'cfg_algorithm',
        value:'ALL',
        des:'定位算法：TDOA, TDOAv2, TOF, ALL（默认：ALL）'
    },
    {
        key:'cfg_iteration_num',
        value:'1',
        des:'TDOAv2去掉最差圆的迭代次数'
    },
    {
        key:'cfg_inner_ratio',
        value:0.01,
        des:'去掉内含圆的限制比例;大圆圆心到小圆圆心的距离加上小圆的半径减去大圆的半径，最后除以大圆的半径'
    },
    {
        key:'cfg_cache_time',
        value:3,
        des:'缓存一段时间的定位数据,缓解定位卡顿的问题.副作用是延迟很高'
    },
    {
        key:'cfg_coordLse',
        value:0.08,
        des:'tdoa+tof求解后的过滤标准'
    },
    {
        key:'cfg_distance_max',
        value:100,
        des:lang['cfg_distance_max']
    },
    {
        key:'cfg_distance_min',
        value:0.01,
        des:lang['cfg_distance_min']
    },
    {
        key:'cfg_diff_divide',
        value:0.95,
        des:'距离差的绝对值除以两基站之间的距离，大于此阈值距离差将会被过滤'
    },
    {
        key:'cfg_sum_divide',
        value:3,
        des:'初始定位点到两基站之间的距离和除以两基站之间的距离，大于此阈值距离差将会被过滤'
    },
    {
        key:'cfg_ekf_update_overTime',
        value:6000,
        des:'(ms)持续时间内如果都没有定位结果计算出来，将停止输出预测值'
    },

    {
        key:'cfg_isSet_master_ref',
        value:0,
        des:lang['cfg_isSet_master_ref']
    },
    {
        key:'cfg_finEkf_R',
        value:0.05,
        des:lang['cfg_finEkf_R']
    },
    {
        key:'cfg_filter_null_coord',
        value:0,
        des:lang['cfg_filter_null_coord']
    },
    {
        key:'cfg_plos_threshold',
        value:-3,
        des:lang['cfg_plos_threshold']
    },
    {
        key:'cfg_rssi_threshold',
        value:-95,
        des:lang['cfg_rssi_threshold']
    },
    {
        key:'cfg_mc_threshold',
        value:10,
        des:lang['cfg_mc_threshold']
    },
    {
        key:'cfg_IDiff_threshold',
        value:400,
        des:lang['cfg_IDiff_threshold']
    },
    {
        key:'cfg_rxFP_threshold',
        value:35,
        des:lang['cfg_rxFP_threshold']
    },
    {
        key:'cfg_plos_is_no_filter',
        value:0,
        des:lang['cfg_plos_is_no_filter']
    },
    {
        key:'cfg_min_pos_num',
        value:2,
        des:lang['cfg_min_pos_num']
    },
    {
        key:'cfg_icRatio',
        value:0.2,
        des:lang['cfg_icRatio']
    },
    {
        key:'cfg_acRatio',
        value:0.5,
        des:lang['cfg_acRatio']
    },
    {
        key:'cfg_group_num',
        value:2,
        des:lang['cfg_group_num']
    },
    {
        key:'cfg_mean_plos_limit',
        value:6,
        des:lang['cfg_mean_plos_limit']
    },
    {
        key:'cfg_residual_limit',
        value:20,
        des:lang['cfg_residual_limit']
    },
    {
        key:'cfg_sync_timeLimit',
        value:300,
        des:lang['cfg_sync_timeLimit']
    },
    {
        key:'cfg_lowpass',
        value:0.5,
        des:lang['cfg_lowpass']
    },
    {
        key:'cfg_ekf_ratio',
        value:'EKF_RATIO',
        des:lang['cfg_ekf_ratio']
    },
    {
        key:'cfg_ekf_disDiff_r',
        value:0.5,
        des:lang['cfg_ekf_disDiff_r']
    },
    {
        key:'cfg_ekf_disDiff_update_dtLimit',
        value:1,
        des:lang['cfg_ekf_disDiff_update_dtLimit']
    },
    {
        key:'cfg_ekf_disDiff_update_overTime',
        value:6000,
        des:lang['cfg_ekf_disDiff_update_overTime']
    },
    {
        key:'cfg_ekf_coord_update_dtLimit',
        value:2,
        des:lang['cfg_ekf_coord_update_dtLimit']
    },
    {
        key:'cfg_ekf_coord_r',
        value:5 * this.EKF_RATIO,
        des:lang['cfg_ekf_coord_r']
    },
    {
        key:'cfg_ekf_coord_r_motionless',
        value:0.5 * this.EKF_RATIO,
        des:lang['cfg_ekf_coord_r']
    },
    {
        key:'cfg_ekf_coord_r_movingSlow',
        value:1.5 * this.EKF_RATIO,
        des:lang['cfg_ekf_coord_r']
    },
    {
        key:'cfg_ekf_coord_r_movingFast',
        value:0.25 * this.EKF_RATIO,
        des:lang['cfg_ekf_coord_r']
    },
    {
        key:'cfg_ekf_coord_r_walk',
        value:0.015 * this.EKF_RATIO,
        des:lang['cfg_ekf_coord_r']
    },
    {
        key:'cfg_ekf_coord_r_running',
        value:0.001 * this.EKF_RATIO,
        des:lang['cfg_ekf_coord_r']
    },
    {
        key:'cfg_ekf_coord_isDynamicUpdateR',
        value:1,
        des:lang['cfg_ekf_coord_r']
    },
    {
        key:'cfg_disDiff_max',
        value:100,
        des:lang['cfg_disDiff_max']
    },
    {
        key:'cfg_disDiff_min',
        value:-100,
        des:lang['cfg_disDiff_min']
    },
    {
        key:'cfg_heightDiff',
        value:0,
        des:lang['cfg_heightDiff']
    },
    {
        key:'cfg_tag_height',
        value: 1.5,
        des: "标签高度"
    },
    {
        key:'cfg_tof_offset',
        value:0,
        des:lang['cfg_tof_offset']
    },
    {
        key:'cfg_tof_lowPass',
        value:0.75,
        des:lang['cfg_tof_lowPass']
    },
    {
        key:'cfg_tof_sqZmax',
        value:5,
        des:lang['cfg_tof_sqZmax']
    },
    {
        key:'cfg_tof_sqZmin',
        value:-0.5,
        des:lang['cfg_tof_sqZmin']
    },
    {
        key:'cfg_tof_sqZrange',
        value:1.5,
        des:lang['cfg_tof_sqZrange']
    },
    {
        key:'cfg_selectGroup_acRatio',
        value:3,
        des:'二维区域直接选定的acRatio阈值'
    },
    {
        key:'cfg_selectGroup_sustainTime',
        value:1000,
        des:lang['cfg_selectGroup_sustainTime']
    },
    {
        key:'cfg_selectGroup_sustainNum',
        value:10,
        des:lang['cfg_selectGroup_sustainNum']
    },
    {
        key:'cfg_plosOk_min',
        value:1,
        des:lang['cfg_plosOk_min']
    },
    {
        key:'cfg_plosOk_mean_min',
        value:4,
        des:lang['cfg_plosOk_mean_min']
    },
    {
        key:'cfg_rate_limit',
        value:15,
        des:lang['cfg_rate_limit']
    },
    {
        key:'cfg_last_pos_distance_limit',
        value:1.5,
        des:lang['cfg_last_pos_distance_limit']
    },
    {
        key:'cfg_last_pos_time_limit',
        value:1500,
        des:lang['cfg_last_pos_time_limit']
    },
    {
        key:'cfg_last_pos_span_limit',
        value:10,
        des:lang['cfg_last_pos_span_limit']
    },
    {
        key:'cfg_map_extend_distance',
        value:4,
        des:lang['cfg_map_extend_distance']
    },
    {
        key:'cfg_use_best_plos_anchors',
        value:0,
        des:lang['cfg_use_best_plos_anchors']
    },
    {
        key:'cfg_use_nearest_anchors',
        value:0,
        des:lang['cfg_use_nearest_anchors']
    },
    {
        key:'cfg_use_best_mc_anchors',
        value:0,
        des:lang['cfg_use_best_mc_anchors']
    },
    {
        key:'cfg_near_tof',
        value:800,
        des:lang['cfg_near_tof']
    },
    {
        key:'cfg_avgMc_threshold',
        value:15,
        des:lang['cfg_avgMc_threshold']
    },
    {
        key:'cfg_disDiff_smooth_time',
        value:1000,
        des:''
    },
    {
        key:'cfg_x_offset',
        value:0,
        des:lang['cfg_x_offset']
    },
    {
        key:'cfg_y_offset',
        value:0,
        des:lang['cfg_y_offset']
    },
    {
        key:'cfg_rate_offset',
        value:0,
        des:lang['cfg_rate_offset']
    },
    {
        key:'isDownStreamCoord',
        value:0,
        des:lang['isDownStreamCoord']
    },
    {
        key:'isDownStreamAlert',
        value:0,
        des:lang['isDownStreamAlert']
    },
    {
        key:'isDownStreamRelateTagsInfo',
        value:0,
        des:lang['isDownStreamRelateTagsInfo']
    },
    {
        key:'cfg_disable_imu',
        value:0,
        des:lang['cfg_disable_imu']
    },
    {
        key:'cfg_disableMsgTypes',
        value:'',
        des:lang['cfg_disableMsgTypes']
    },
    {
        key:'cfg_disableTags',
        value:'',
        des:lang['cfg_disableTags']
    },
    {
        key:'cfg_forceSelectAlone',
        value:0,
        des:lang['cfg_forceSelectAlone']
    },
    {
        key:'cfg_enable_gps_coordinate',
        value:0,
        des:'开启gps坐标'
    },
    {
        key:'cfg_webMap_showAllTag',
        value:0,
        des:'打开地图时显示所有标签'
    },
    {
        key:'cfg_floor',
        value:1,
        des:'地图所属楼层（如三层填3）'
    },
    {
        key:'cfg_no_fence_log',
        value: 0,
        des:'是否存储围栏记录，0:记录'
    },
    {
        key:'cfg_no_coord_log',
        value: 0,
        des:'是否存储位置记录，0:记录'
    },
    {
        key:'cfg_websocket_distance',
        value: 0,
        des:'开启测距websocket'
    },
    {
        key:'cfg_cancleTagAnimateMove_spanTime',
        value:600000,
        des:'控制地图标签移动显示，当标签两个定位包超过多长时间（微秒），不以动画形式移动。'
    },
]