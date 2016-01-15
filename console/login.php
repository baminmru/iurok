<?php	
	session_start();
				
	if (!isset($_SESSION['B2SESSION']) || $_SESSION['B2SESSION']=='') 
	{
?>		
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf8">
	<title>СУП. ИНТЕРНЕТУРОК</title>
	<link rel="shortcut icon" href="resources/icons/house.png">
	<link rel="stylesheet" type="text/css" href="resources/css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="resources/css/icons.css"/>
    <!-- <link rel="stylesheet" type="text/css" href="resources/css/ext-overrides.css"/> -->

    <script type="text/javascript" src="ext-all-debug.js"></script>	
	<script type="text/javascript" src="js/login.js"></script>	
	<script type="text/javascript">Ext.onReady(function () {login_win.show();});</script>
</head>
	<body scroll="no" >
	</body>
</html>

<?php
		exit();
	}	
?>
		