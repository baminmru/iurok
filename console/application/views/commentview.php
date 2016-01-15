<?php	
	header("Cache-control: public");
	header("Cache-control: max-age=86400");
	session_start();
	log_message('debug', 'appview: B2SESSION= >'.$_SESSION['B2SESSION'].'<' );
	$cid=$this->input->get('id', FALSE)."";
			
				
				
	if (!isset($_SESSION['B2SESSION']) || $_SESSION['B2SESSION']=='') 
	{
?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Страница урока</title>
	
	<script>
		var rootURL= "../";
	</script>
	<link href="../resources/icons/soop.png" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="../resources/css/ext-all-comment.css"/>
	<link rel="stylesheet" type="text/css" href="../resources/css/CheckHeader.css" />
	
	<!-- video js -->
	<!-- Chang URLs to wherever Video.js files will be hosted -->
	<link href="../resources/css/video-js.css" rel="stylesheet" type="text/css">
	  <!-- video.js must be in the <head> for older IEs to work. -->
	<script src="../resources/video.dev.js"></script>
    <script>
		videojs.options.flash.swf = "../resources/video-js.swf";
	</script>
 
    <link rel="stylesheet" type="text/css" href="../resources/css/icons.css"/>
    <link rel="stylesheet" type="text/css" href="../resources/css/ext-overrides.css"/> 

    <script type="text/javascript" src="../ext-all.js"></script>
	<!-- <script type="text/javascript" src="ext-neptune-debug.js"></script> -->
	<!-- <script type="text/javascript" src="bootstrap.js"></script> -->
	<script type="text/javascript" src="../ux/InputTextMask.js"></script>
    
	 <script type="text/javascript" src="../resources/exporter/Base64.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Cell.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Style.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Worksheet.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Workbook.js"></script>
	 
	 
	 <script type="text/javascript" src="../locale/ext-lang-ru.js"></script>
	 <script type="text/javascript" src="../resources/myfileuploader.js"></script>
	 <script type="text/javascript" src="../resources/common.js"></script>
	 <script type="text/javascript" src="../resources/videocomment.js"></script>

	
   
    <script type="text/javascript">
        var combo_pbar = null;
        var combo_timeout_id = null;
        var combo_StoreLoading = false;
        var combo_Waiter = 0;
        var combo_Index = -1;
        var combo_Stores = new Array();
		var urokcode=<?php echo "'".$cid."'"; ?>;
    </script>
    <!-- Model and stores JavaScript -->
    <script type="text/javascript" src="../resources/models.js"></script>
    <script type="text/javascript" src="../resources/enums.js"></script>
	<script type="text/javascript" src="../resources/mystores.js"></script>

   <?php 
	//require('inc.php'); 
   ?>

    <!-- Application JavaScript -->

    <script type="text/javascript" src="../resources/comment.js"></script>
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
    <title>Страница урока</title>
	<link href="../resources/icons/soop.png" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="../resources/css/ext-all-comment.css"/>
	<link rel="stylesheet" type="text/css" href="../resources/css/CheckHeader.css" />
	<script>
		var rootURL= "../";
	</script>
	
	<!-- video js -->
	<!-- Chang URLs to wherever Video.js files will be hosted -->
	<link href="../resources/css/video-js.css" rel="stylesheet" type="text/css">
	  <!-- video.js must be in the <head> for older IEs to work. -->
	<script src="../resources/video.dev.js"></script>
    <script>
		videojs.options.flash.swf = "../resources/video-js.swf";
	</script>
 
    <link rel="stylesheet" type="text/css" href="../resources/css/icons.css"/>
     <link rel="stylesheet" type="text/css" href="../resources/css/ext-overrides.css"/> 

    <script type="text/javascript" src="../ext-all.js"></script>
	<!-- <script type="text/javascript" src="ext-neptune-debug.js"></script> -->
	<!-- <script type="text/javascript" src="bootstrap.js"></script> -->
	<script type="text/javascript" src="../ux/InputTextMask.js"></script>
    
	 <script type="text/javascript" src="../resources/exporter/Base64.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Cell.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Style.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Worksheet.js"></script>
	 <script type="text/javascript" src="../resources/exporter/Workbook.js"></script>
	 <script type='text/javascript' src='../resources/iu_cm_time_.js'></script>
	 
	 <script type="text/javascript" src="../locale/ext-lang-ru.js"></script>
	<script type="text/javascript" src="../resources/myfileuploader.js"></script>
	 <script type="text/javascript" src="../resources/common.js"></script>
	 <script type="text/javascript" src="../resources/videocomment.js"></script>
	
   
    <script type="text/javascript">
        var combo_pbar = null;
        var combo_timeout_id = null;
        var combo_StoreLoading = false;
        var combo_Waiter = 0;
        var combo_Index = -1;
        var combo_Stores = new Array();
		var urokcode=<?php echo "'".$cid."'"; ?>;
    </script>
    <!-- Model and stores JavaScript -->
    <script type="text/javascript" src="../resources/models.js"></script>
    <script type="text/javascript" src="../resources/enums.js"></script>
	<script type="text/javascript" src="../resources/mystores.js"></script>

   <?php 
   //require('inc.php'); 
   ?>

    <!-- Application JavaScript -->
	
	<script type="text/javascript" src="../resources/selectobj.js"></script>
	<script type="text/javascript" src="../resources/partref.js"></script>
	<script type="text/javascript" src="../resources/multyref.js"></script>
    <script type="text/javascript" src="../resources/comment.js"></script>
	<script type="text/javascript" src="../resources/rolelist.js"></script>
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