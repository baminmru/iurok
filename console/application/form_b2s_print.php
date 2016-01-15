<style type="text/css">
	* {font-family: Arial; font-size: 12px;}
	tr {
		height: 26px;
	}
	
	label{
		float: left;
		margin: 0px 15px;
		font-size: 18px;
	}
	p{
		margin: 0px, 20px !important;
	}
legend {
			
			font-weight:bold; 
			font-family:Georgia; 
			font-size:20px;
		}

</style>
<?php 
	$url = base_url();
	$imagesurl = base_url();
?>
<div class="b2view" style="width:1000px; height: 500px";>
<?

	$entry = (array)$posts[0];

	$contact=$contacts->rows[0]; 

	if($entry['b2s_info_isrent_val'] == -1) $isrent = 1;
	$region = trim(str_replace(';', '', $entry['b2s_info_regionid']));
	
	$f = "";
	
	$entry['b2s_info_cityid'] = trim(str_replace(';', '', $entry['b2s_info_cityid']));

	if(($entry['b2s_info_cityid'] != $entry['b2s_info_streetid1']) && (strpos($entry['b2s_info_addressstring'], $entry['b2s_info_cityid']) === false)) 
		$f .= $entry['b2s_info_cityid'];   
		
	if($entry['b2s_info_addressstring'] != "") 
		$f .=(($f)?(', '):('')).$entry['b2s_info_addressstring']; 		
	else 
		$f .= (($f)?(', '):('')).$entry['b2s_info_streetid1'];  
		
	if($entry['b2s_info_house'] != "") 
		$f .= (($f)?(', '):('')).'дом '.$entry['b2s_info_house'];   
		
	if($entry['b2s_info_block'] != "") 
		$f .= (($f)?(', '):('')).'к. '.$entry['b2s_info_block'];
		
?>
	<div class="mdb_iteminfo">
	<fieldset style="border: 1px solid #434343;
					padding: 10px;
					width: 1000px">

		<? if($isrent) { ?>
		<legend style="text-align:center;">Аренда квартиры</legend>
		<script>
		//	$('title').html('Аренда квартиры');
		</script>
		<? } else { ?>
		<legend style="text-align:center;">Продажа квартиры: <?=$f?></legend>
		<script>
		//	$('title').html('Продажа квартиры: <?=$f?>');
		</script>	
		<? } ?>	

		<table width=100%>
			<tbody>
			<tr>
			<td style="vertical-align: top;" valign="top">
				<div style="width:440px;">
					<?php
					$ntype = 'b2s';
						if(sizeof($photos->rows) != 0)
							{
								$imagename="images";
								if(array_key_exists($ntype.'_info_firmid_id', $entry))
								{
									if ($entry[$ntype.'_info_firmid_id']=='{8ED6EE64-5714-49B2-B2C6-90F3D4FCE6E4}') 
									{
										$imagename="images";
									}
									if ($entry[$ntype.'_info_firmid_id']=='{FCE9799C-F401-4930-8BE3-17439B863FFF}') 
									{
										$imagename="images_rfn";
									}
								} 
								else { }

					?>


<div id="gallery" class="ad-gallery" style="">
	<div style="background-color: #ffffff; padding: 2px; border:1px solid #bbbbbb; margin-bottom: 4px;">
		<div style="background-color: #eeeeee; margin: 0px; padding:3px;">
			<div class="ad-image-wrapper" style="height: 280px;">
				<?php
					$pitem = $photos[0];
														
						if(file_exists(dirname(__FILE__).'/../../'.$imagename.'/'.$ntype.'_big/'.$pitem['filename']) && $pitem['filename'])
						{
							$size = null;
							try 
							{
								$size = @getimagesize (dirname(__FILE__).'/../../'.$imagename.'/'.$ntype.'_big/'.$pitem['filename']);
							} 
							catch (Exception $e) 
							{
							}
							if ($size!=null)
							{								
								echo '<img width="428px" height="280px" src="'.$imagesurl.'/'.$imagename.'/'.$ntype.'_big/'.$pitem['filename'].'"  alt="" title="" />';
							}else
							{
								echo '<!-- "'.$pitem['filename'].'" error size -->';
							}
						} else
						{
							echo '<!-- "'.$pitem['filename'].'" not exists -->';
						}
				?>
			</div>
		</div>
	</div>
</div>


		<?php

		};

		?>
		<!--Это карта-->
	<div style="background-color: #ffffff; padding: 2px; border:1px solid #bbbbbb; margin-bottom: 4px;">
		<?

			$prefix = 'b2s';
			$lat = $entry[$prefix.'_info_latitude'];
			$lon = $entry[$prefix.'_info_longitude'];
			$w = 433;
			$h = 295;
    		echo '<img src="http://static-maps.yandex.ru/1.x/?ll='.$lat.','.$lon.'&size='.$w.','.$h.'&z=13&l=map&pt='.$lat.','.$lon.',pmwtm1&key=APB9aU8BAAAA7ZqaNgIA1IYsXBfCt-eS6xdS-VHWllT5-IUAAAAAAAAAAAAEAagWXg2zqMa5-ImqylDnAmyNKw=="/>';
		?>	
	</div>
		</div>

			</td>
			<td style="vertical-align: top;">
				<div class="data">
					<table class="data" border="0" cellpadding="0" cellspacing="0" width="100%">
					<tbody>
						<tr>
							<th><label>Контакт:</label></th>
							<td ><?php  echo 'тел.'.$entry['b2s_info_webpone'];echo '&nbsp;'.str_replace(';',' ',$entry['b2s_info_webcontact']);?></td></tr>
						<tr>
							<th style='margin: 10px;'><label>Адрес:</label></th>
							<td style="border-top:1px solid #aaaaaa;width:70%" ><?=$f?></td></tr>
						<tr>
							<th><label>Метро:</label></th>
							<td style="border-top:1px solid #aaaaaa;width:70%"><?php   echo '&nbsp;'.$entry['b2s_info_subway']; ?></td></tr>
						<tr>
							<th><label>Тип объекта:</label></th>
							<td style="border-top:1px solid #aaaaaa;width:70%"><?php   echo '&nbsp;'.$entry['b2s_info_ttypeobjsecondid']; ?></td></tr>
						<tr>
							<th ><label>Цена:</label></th>
							<td style="border-top:1px solid #aaaaaa;width:70%"><?php   echo '&nbsp;'.$entry['b2s_info_amount']; ?> <?php   echo '&nbsp;'.$entry['b2s_info_tcurrencyid']; '<br />'?></td></tr>
						<tr>
							<th colspan="2" style="border-top:1px solid #aaaaaa;width:40%"><label style="font-size: larger;">Общая информация:</label></th></tr>
						<tr>
							<td><label>Кол-во комнат:</label></td>
							<td  ><?php   echo '&nbsp;'.$entry['b2s_info_rooms']; ?></td></tr>
						<tr><td><label>Общая пл.:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%"   ><?php   echo '&nbsp;'.$entry['b2s_info_sall']; ?> м<sup>2</sup></td></tr>
						<tr>
							<td><label>Жилая пл.:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%"  ><?php   echo '&nbsp;'.$entry['b2s_info_sliving']; ?> м<sup>2</sup></td></tr>
						<tr>
							<td><label>Пл.комнат:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%"  ><?php   echo '&nbsp;'.$entry['b2s_info_srooms']; ?> м<sup>2</sup></td></tr>
						<tr>
							<td><label>Кухня:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%"  ><?php   echo '&nbsp;'.$entry['b2s_info_skitchen']; ?> м<sup>2</sup></td></tr>
						<tr>
							<td><label>Этаж:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%"  ><?php   echo '&nbsp;'.$entry['b2s_info_floor']; ?> </td></tr>
						<tr>
							<td><label>Этажность:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%"  ><?php   echo '&nbsp;'.$entry['b2s_info_floors']; ?> </td></tr>
						<tr>
							<td><label>Тип дома:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%" > <?php   echo '&nbsp;'.$entry['b2s_info_thouseid']; ?></td></tr>
						<tr>
							<td><label>Лифт:</label></td>
							<td   style="border-top:1px solid #aaaaaa;width:70%" ><?php echo '&nbsp;'.$entry['b2s_info_tliftid']; ?></td></tr>
						<tr>
							<th style="border-top:1px solid #aaaaaa;width:30%;" ><label style="font-size: larger;">Описание:</label></th>
							<td style="border-top:1px solid #aaaaaa;width:70%">&nbsp;</td></tr>
						<tr style="padding: 15px">
							<td  colspan="2"><?php   echo  '<p style="padding: 0px 15px;">&nbsp;'.$entry['b2s_info_note1'];'<p>'?></td></tr>
					</tbody>
					</table>
				</div>
			</td>
			</tr>
		</tbody>
		</table>
	</div>
	</fieldset>	
</div>
<?if(!$ajax) {?> </div><?}?>





