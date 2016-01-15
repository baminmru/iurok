<?php
error_reporting(E_ALL); ini_set('display_errors','On');

		

		$mess = "		
		Имя:".$_REQUEST['name']."\r\n <br />
		e-mail: ".$_REQUEST['mail']."\r\n <br />
		Текст: ".$_REQUEST['text']."\r\n";
		
		

		if ($_REQUEST['title']==1)
		$title = "Ошибка в работе комплекса interda.org";
		else
		$title = "Предложение по улучшению  комплекса interda.org";
		
		
			
		$to = 'test@test.ru'; 
		
		
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$headers .= 'To: '. $to . "\r\n";
		$headers .= 'From: rmbd.ru' . "\r\n";
		$mess = wordwrap($mess, 70);
		
		if(mail($to, $title, $mess, $headers)) {
			die('{success:true}');	
		}
		else {
			die('{success:false}');	
		}


