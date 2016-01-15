
<?php
class  M_urokcard extends CI_Model {
 
    function getDef($Id) {
    $result = array('success' => false, 'msg' => 'No Row ID for retrive data');
	if (!empty($Id)){
	    $res = $this->jservice->get(array('Action' => 'GetViewData','FieldList'=>'B2G(iu_urok_defid) as iu_urok_defid, B2G(iu_urok_defid) as id,B2G(instanceid) as instanceid, iu_urok_def_BRIEF_F(iu_urok_defid , NULL) as  brief,ucode,  DATE_FORMAT(datecreated,\'%Y-%m-%d %H:%i:%s\') as  datecreated,B2G(subject) subject, iud_predmet_BRIEF_F(subject, NULL) as subject_grid,B2G(theClassnum) theclassnum, iu_clsinfo_BRIEF_F(theclassnum, NULL) as theclassnum_grid,plannum,B2G(maketown) maketown, iud_town_BRIEF_F(maketown, NULL) as maketown_grid,B2G(coursetype) coursetype, iud_ctype_BRIEF_F(coursetype, NULL) as coursetype_grid,rtheme,classtheme,thequarter, case thequarter  when 0 then \'?\' when 1 then \'I\' when 2 then \'II\' when 3 then \'III\' when 4 then \'IV\'End  as thequarter_grid,  schooldate as  schooldate,B2G(curator) curator, iu_u_def_BRIEF_F(curator, NULL) as curator_grid,B2G(theTeacher) theteacher, iu_tmdef_BRIEF_F(theteacher, NULL) as theteacher_grid,B2G(methodist) methodist, iu_tmdef_BRIEF_F(methodist, NULL) as methodist_grid,B2G(methodist2) methodist2, iu_tmdef_BRIEF_F(methodist2, NULL) as methodist2_grid,B2G(processtype) processtype, iud_process_def_BRIEF_F(processtype, NULL) as processtype_grid,testpageref, mainref', 'ViewName' => 'iu_urok_def', 'WhereClause' => 'ucode=\''. $Id .'\''	));
	    if (!empty($res)) {
	        $result = $res[0];
	    }
	}
	return $result;
    }
	
	
	function getDocs($id,$sort=array())
	{
		$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_urok_docsid) as iu_urok_docsid, B2G(iu_urok_docsid) as id,B2G(instanceid) as instanceid, iu_urok_docs_BRIEF_F(iu_urok_docsid , NULL) as  brief,B2G(DocType) doctype, iud_doctype_BRIEF_F(doctype, NULL) as doctype_grid,B2G(AddBy) addby, iu_u_def_BRIEF_F(addby, NULL) as addby_grid,  DATE_FORMAT(adddate,\'%Y-%m-%d %H:%i:%s\') as  adddate,version,activeversion, case activeversion  when -1 then \'Да\' when 0 then \'Нет\'End  as activeversion_grid,B2G(filereftype) filereftype, iud_rt_def_BRIEF_F(filereftype, NULL) as filereftype_grid,fileref,fileref_ext,fileurl,filetext,info', 'ViewName' => 'iu_urok_docs', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
		if (count($res) == 0) {
			return null;
		} else {
			return $res;
		}
	}
  

	
	function getVideo($id,$sort=array())
	{
		$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'nocomments, B2G(iu_urok_videoid) as iu_urok_videoid, B2G(iu_urok_videoid) as id,B2G(instanceid) as instanceid, iu_urok_video_BRIEF_F(iu_urok_videoid , NULL) as  brief,  DATE_FORMAT(adddate,\'%Y-%m-%d %H:%i:%s\') as  adddate,B2G(DocType) doctype, iud_videotype_BRIEF_F(doctype, NULL) as doctype_grid,activeversion, case activeversion  when -1 then \'Да\' when 0 then \'Нет\'End  as activeversion_grid,B2G(AddBy) addby, iu_u_def_BRIEF_F(addby, NULL) as addby_grid,version,fileurl,fileref,fileref_ext,info,origname', 'ViewName' => 'iu_urok_video', 'WhereClause' => 'instanceid=G2B(\''. $id . '\')'));
		if (count($res) == 0) {
			return null;
		} else {
			return $res;
		}
	}
	
	
	
	   function getVideoCommentsHeader($videoid,$sort=array())
		{
			$res = $this->jservice->get(array('Action' => 'GetViewData','Sort'=>$sort,'FieldList'=>'B2G(iu_cm_defid) as iu_cm_defid, B2G(iu_cm_defid) as id,B2G(instanceid) as instanceid, iu_cm_def_BRIEF_F(iu_cm_defid , NULL) as  brief,  DATE_FORMAT(thedate,\'%Y-%m-%d %H:%i:%s\') as  thedate,B2G(TheProcess) theprocess, iu_urok_def_BRIEF_F(theprocess, NULL) as theprocess_grid,isdiscussion, case isdiscussion  when -1 then \'Да\' when 0 then \'Нет\'End  as isdiscussion_grid,B2G(theDoc) thedoc, iu_urok_docs_BRIEF_F(thedoc, NULL) as thedoc_grid,B2G(theVideo) thevideo, iu_urok_video_BRIEF_F(thevideo, NULL) as thevideo_grid,thetheme,B2G(TheAuthor) theauthor, iu_u_def_BRIEF_F(theauthor, NULL) as theauthor_grid', 'ViewName' => 'iu_cm_def', 'WhereClause' => 'thevideo=G2B(\''. $videoid . '\')'));
			if (count($res) == 0) {
				return null;
			} else {
				return $res;
			}
		}
	 
	 
		function getCommonComments($id,$curator)
		{
			$res = $this->jservice->get(array('Action' => 'GetCommentThemes', 'instanceid' =>$id,'curator'=>$curator));
			return $res;
		}
		function getVideoComments($id,$curator)
		{
			$res = $this->jservice->get(array('Action' => 'GetCommentVideoThemes', 'instanceid' =>$id,'curator'=>$curator));
			return $res;
		}
}
?>