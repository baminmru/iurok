<?php	
	header("Cache-control: public");
	header("Cache-control: max-age=86400");
	session_start();
	log_message('debug', 'urokview: B2SESSION= >'.$_SESSION['B2SESSION'].'<' );
	
	$uid=$this->input->get('uid', FALSE)."";
	
				
	log_message('debug', 'urokview: urok_id= >'.$_SESSION['urok_id'].'<' );
	if (!isset($_SESSION['B2SESSION']) || $_SESSION['B2SESSION']=='') 
	{
?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Карточка урока</title>
	
	<script>
		var rootURL= "../";
	</script>
	<link href="../resources/icons/soop.png" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="../resources/css/CheckHeader.css" />

    <link rel="stylesheet" type="text/css" href="../resources/css/icons.css"/>
    <script type="text/javascript" src="../ext-all.js"></script>

	<script type="text/javascript" src="../ux/InputTextMask.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Base64.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Cell.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Style.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Worksheet.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Workbook.js"></script>
	 
	 <script src="../resources/gantt/dhtmlxgantt.js" type="text/javascript" charset="utf-8"></script>
	 	<script src="../resources/gantt/dhtmlxgantt_tooltip.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="../resources/gantt/dhtmlxgantt_skyblue.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <script src="../resources/gantt/locale/locale_ru.js" charset="utf-8"></script>
	<link rel="stylesheet" href="../resources/gantt/mygantt.css" type="text/css" media="screen" title="no title" charset="utf-8">
	 
	 
	 <script type="text/javascript" src="../locale/ext-lang-ru.js"></script>
	<script type="text/javascript" src="../resources/myfileuploader.js"></script>
	 <script type="text/javascript" src="../resources/common.js"></script>
	 	<script type="text/javascript" src="../resources/card.js"></script>

	 
	
  <!--   journal :autoiu_urok_def -->

     <script type='text/javascript' src='../resources/s_v_autoiu_urok_def.js'></script>
     <script type='text/javascript' src='../resources/j_v_autoiu_urok_def.js'></script>
<!--   journal :autoiu_urok_def end -->
   <!--   type:iu_urok mode:usr_ -->

     <script type='text/javascript' src='../resources/iu_urok_def_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_docs_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_video_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_creators_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_usr_.js'></script>
<!--   type:iu_urok mode:usr_ end -->

<!--   type:iu_urok mode:main -->

     <script type='text/javascript' src='../resources/iu_urok_def_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_ctrl_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_docs_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_video_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_creators_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_main.js'></script>
<!--   type:iu_urok mode:main end -->

<!--   type:iu_urok mode:new_ -->

     <script type='text/javascript' src='../resources/iu_urok_def_new_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_new_.js'></script>
<!--   type:iu_urok mode:new_ end -->

<!--   type:iu_urok default mode -->

     <script type='text/javascript' src='../resources/iu_urok_def_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_ctrl_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_docs_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_video_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_creators_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_.js'></script>
<!--   type:iu_urok default mode end  -->

<!--   type:iu_us default mode -->

     <script type='text/javascript' src='../resources/iu_urok_prc_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_sn_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_graph_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_msg_.js'></script>
     <script type='text/javascript' src='../resources/iu_us_.js'></script>
<!--   type:iu_us default mode end  -->
	<!--   type:iu_tm default mode -->

     <script type='text/javascript' src='../resources/iu_tmdef_.js'></script>
     <script type='text/javascript' src='../resources/iu_tmcadr_.js'></script>
     <script type='text/javascript' src='../resources/iu_tm_records_.js'></script>
     <script type='text/javascript' src='../resources/iu_tm_dog_.js'></script>
	  <script type='text/javascript' src='../resources/iu_tm_act_.js'></script>
     <script type='text/javascript' src='../resources/iu_tm_.js'></script>
<!--   type:iu_tm default mode end  -->
	
   
    <script type="text/javascript">
        var combo_pbar = null;
        var combo_timeout_id = null;
        var combo_StoreLoading = false;
        var combo_Waiter = 0;
        var combo_Index = -1;
        var combo_Stores = new Array();
		var urokid=<?php echo "'".$uid."'"; ?>;
    </script>
    <!-- Model and stores JavaScript -->
    <script type="text/javascript" src="../resources/models.js"></script>
    <script type="text/javascript" src="../resources/enums.js"></script>
	<script type="text/javascript" src="../resources/mystores.js"></script>
	<script type="text/javascript" src="../resources/login.js"></script>

</head>
<body>
<div id="loading-mask"></div>
<div id="loading"><span id="loading-message"></span></div>
</body>
</html>


<?php
		//exit();
	}	else{
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Карточка урока</title>
	<link href="../resources/icons/soop.png" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="../resources/css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="../resources/css/CheckHeader.css" />
	<script>
		var rootURL= "../";
	</script>
	
 
    <link rel="stylesheet" type="text/css" href="../resources/css/icons.css"/>
    <script type="text/javascript" src="../ext-all.js"></script>

	<script src="../resources/gantt/dhtmlxgantt.js" type="text/javascript" charset="utf-8"></script>
	<script src="../resources/gantt/dhtmlxgantt_tooltip.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="../resources/gantt/dhtmlxgantt_skyblue.css" type="text/css" media="screen" title="no title" charset="utf-8">
    <script src="../resources/gantt/locale/locale_ru.js" charset="utf-8"></script>
	<link rel="stylesheet" href="../resources/gantt/mygantt.css" type="text/css" media="screen" title="no title" charset="utf-8">
	
	<script type="text/javascript" src="../resources/myfileuploader.js"></script>
	 <script type="text/javascript" src="../resources/common.js"></script>
	 <script type="text/javascript" src="../resources/card.js"></script>
	<script type="text/javascript" src="../ux/InputTextMask.js"></script>
    
	 <script type="text/javascript" src="../resources/exporter/Base64.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Cell.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Style.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Worksheet.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Workbook.js"></script>
		 
	 <script type="text/javascript" src="../locale/ext-lang-ru.js"></script>
	  <script type="text/javascript" src="../resources/myfileuploader.js"></script>
  <!--   journal :autoiu_urok_def -->

     <script type='text/javascript' src='../resources/s_v_autoiu_urok_def.js'></script>
     <script type='text/javascript' src='../resources/j_v_autoiu_urok_def.js'></script>
<!--   journal :autoiu_urok_def end -->
   <!--   type:iu_urok mode:usr_ -->

     <script type='text/javascript' src='../resources/iu_urok_def_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_docs_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_video_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_creators_usr_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_usr_.js'></script>
<!--   type:iu_urok mode:usr_ end -->

<!--   type:iu_urok mode:main -->

     <script type='text/javascript' src='../resources/iu_urok_def_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_ctrl_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_docs_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_video_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_creators_main.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_main.js'></script>
<!--   type:iu_urok mode:main end -->

<!--   type:iu_urok mode:new_ -->

     <script type='text/javascript' src='../resources/iu_urok_def_new_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_new_.js'></script>
<!--   type:iu_urok mode:new_ end -->

<!--   type:iu_urok default mode -->

     <script type='text/javascript' src='../resources/iu_urok_def_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_ctrl_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_docs_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_video_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_creators_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_.js'></script>
<!--   type:iu_urok default mode end  -->

<!--   type:iu_us default mode -->

     <script type='text/javascript' src='../resources/iu_urok_prc_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_sn_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_graph_.js'></script>
     <script type='text/javascript' src='../resources/iu_urok_msg_.js'></script>
     <script type='text/javascript' src='../resources/iu_us_.js'></script>
<!--   type:iu_us default mode end  -->

	<!--   type:iu_tm default mode -->

     <script type='text/javascript' src='../resources/iu_tmdef_.js'></script>
     <script type='text/javascript' src='../resources/iu_tmcadr_.js'></script>
     <script type='text/javascript' src='../resources/iu_tm_records_.js'></script>
     <script type='text/javascript' src='../resources/iu_tm_dog_.js'></script>
	 <script type='text/javascript' src='../resources/iu_tm_act_.js'></script>
     <script type='text/javascript' src='../resources/iu_tm_.js'></script>
<!--   type:iu_tm default mode end  -->
   
    <script type="text/javascript">
        var combo_pbar = null;
        var combo_timeout_id = null;
        var combo_StoreLoading = false;
        var combo_Waiter = 0;
        var combo_Index = -1;
        var combo_Stores = new Array();
		var urokid=<?php echo "'".$uid."'"; ?>;
    </script>
    <!-- Model and stores JavaScript -->
    <script type="text/javascript" src="../resources/models.js"></script>
    <script type="text/javascript" src="../resources/enums.js"></script>
	<script type="text/javascript" src="../resources/mystores.js"></script>

   <?php 
   //require('inc.php'); 
   ?>

    <!-- Application JavaScript -->
	
	<script type="text/javascript" src="../resources/logged.js"></script>

</head>
<body>
<div id="loading-mask"></div>
<div id="loading"><span id="loading-message"></span></div>
</body>
</html>
<?php
	}	
?>