<?php

		error_reporting(E_ALL);
		$config = array();
		$config['storage'] = "/var/www/files"; 
		$config['logpath']="/var/www/log";
		$config['log']=true;

			function logWrite($msg)
		{
			global $config;
			
			if($config['log'])
			{
				date_default_timezone_set('Europe/Moscow');
				
				$date = date('Y-m-d H:i:s');
			
				file_put_contents($config['logpath'].'/_debug.txt', $date.'  '.$msg."\r\n", FILE_APPEND);
			}
			//echo($msg);
		}

	
		/**
		 * Outputs the specified file to the browser.
		 *
		 * @param string $filePath the path to the file to output
		 * @param string $fileName the name of the file
		 * @param string $mimeType the type of file
		 */
		function outputFile($filePath, $fileName, $mimeType = '') {
			logWrite('outputFile '.$filePath.', '.$fileName.', '.$mimeType);
			// Setup
			$mimeTypes = array(
			
				// text
				'txt' => 'text/plain',
				'html' => 'text/html',
				'htm' => 'text/html',
				
				
				
				 // archives
				'zip' => 'application/zip',
				'rar' => 'application/x-rar-compressed',
				'exe' => 'application/x-msdownload',
				'msi' => 'application/x-msdownload',
				'cab' => 'application/vnd.ms-cab-compressed',

				// office
				'pdf' => 'application/pdf',
				'psd' => 'image/vnd.adobe.photoshop',
				'ai' => 'application/postscript',
				'eps' => 'application/postscript',
				'ps' => 'application/postscript',
				'rtf' => 'application/rtf',
				'doc' => 'application/msword',
				'docx' => 'application/msword',
				'xls' => 'application/vnd.ms-excel',
				'xlsx' => 'application/vnd.ms-excel',
				'ods' => 'application/vnd.oasis.opendocument.spreadsheet', 	
				'odt'=> 'application/vnd.oasis.opendocument.text',
				'odp'=>	'application/vnd.oasis.opendocument.presentation',
				'ppt' => 'application/vnd.ms-powerpoint',
				'pps' => 'application/vnd.ms-powerpoint',
				
				
				  // images
				'png' => 'image/png',
				'jpe' => 'image/jpeg',
				'jpeg' => 'image/jpeg',
				'jpg' => 'image/jpeg',
				'gif' => 'image/gif',
				'bmp' => 'image/bmp',
				'ico' => 'image/vnd.microsoft.icon',
				'tiff' => 'image/tiff',
				'tif' => 'image/tiff',
				'svg' => 'image/svg+xml',
				'svgz' => 'image/svg+xml',
				
				 // audio/video
				'mp3' => 'audio/mpeg',
				'qt' => 'video/quicktime',
				'mov' => 'video/quicktime',
				'swf' => 'application/x-shockwave-flash',
				'flv' => 'video/x-flv'
			);

			
			

			$fileSize = filesize($filePath);
			$fileExt = strtolower(substr(strrchr($fileName, '.'), 1));
			$fileName = rawurldecode($fileName);
			logWrite('file size='.$fileSize);
			
			// Determine MIME Type
			if($mimeType == '') {
				

				if(array_key_exists($fileExt, $mimeTypes)) {
					$mimeType = $mimeTypes[$fileExt];
				}
				else {
					$mimeType = 'application/force-download';
				}
			}

			
			logWrite('MIME='.$mimeType);
			
			// Disable Output Buffering
			@ob_end_clean();

			// IE Required
			if(ini_get('zlib.output_compression')) {
				ini_set('zlib.output_compression', 'Off');
			}

			// Send Headers
			header('Content-Type: ' . $mimeType);
			header('Content-Disposition: attachment; filename="' . $fileName . '"');
			header('Content-Transfer-Encoding: binary');
			header('Accept-Ranges: bytes');

			// Send Headers: Prevent Caching of File
			header('Cache-Control: private');
			header('Pragma: private');
			header( 'Expires: '.gmdate( 'D, d M Y H:i:s',time()+60 ) . ' GMT' );
			header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s',time() ) . ' GMT' );
		

			// Multipart-Download and Download Resuming Support
			if(isset($_SERVER['HTTP_RANGE'])) {
				list($a, $range) = explode('=', $_SERVER['HTTP_RANGE'], 2);
				list($range) = explode(',', $range, 2);
				list($range, $rangeEnd) = explode('-', $range);

				$range = intval($range);

				if(!$rangeEnd) {
					$rangeEnd = $fileSize - 1;
				}
				else {
					$rangeEnd = intval($rangeEnd);
				}

				$newLength = $rangeEnd - $range + 1;

				// Send Headers
				header('HTTP/1.1 206 Partial Content');
				header('Content-Length: ' . $newLength);
				header('Content-Range: bytes ' . $range - $rangeEnd / $fileSize);
			}
			else { 
				$newLength = $fileSize;
				header('Content-Length: ' . $fileSize);
				$range = 0;
			}

			// Output File
			$chunkSize = 1 * (1024*1024);
			$bytesSend = 0;

			logWrite('pos='.$range);
			if($file = fopen($filePath, 'r')) {
				logWrite('file opened');
				if(isset($_SERVER['HTTP_RANGE'])) {
					if($_SERVER['HTTP_RANGE']) {
						logWrite('file seek');
						fseek($file, $range);
					}
				}
				while(!feof($file) && !connection_aborted() && $bytesSend < $newLength) {
					$buffer = fread($file, $chunkSize);
					echo $buffer;
					flush();
					$bytesSend += strlen($buffer);
				}
				logWrite('sent='.$bytesSend);
				fclose($file);
				logWrite('file closed');
			}
		}
		
		
  
        $id = isset($_REQUEST['ID']) ? $_REQUEST['ID'] : '';
		$prefix = isset($_REQUEST['prefix']) ? $_REQUEST['prefix'] : 'iu';
		$ext = isset($_REQUEST['ext']) ? $_REQUEST['ext'] : 'txt';
		$origname = isset($_REQUEST['origname']) ? $_REQUEST['origname'] : $id.".".$ext;
		
		$path = $config['storage'] . DIRECTORY_SEPARATOR .  $prefix.'_files'. DIRECTORY_SEPARATOR .$id;
		logWrite('ID='.$id.' prefix='.$prefix.' ext='.$ext.' path='.$path);
		if ($id!=''){
			outputFile($path,$origname);
			//echo('ID='.$id.' prefix='.$prefix.' ext='.$ext.' path='.$path);
			//echo('<br/>size='.filesize($path));
		//}else{
		//	echo('ID='.$id.' prefix='.$prefix.' ext='.$ext.' path='.$path);
		//	echo('<br/>size='.filesize($path));
		}
		
		
		
		
		
		