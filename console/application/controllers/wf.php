<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class wf extends CI_Controller
{
   function NextState() {
		 log_message('debug', 'NextState post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'NextState get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE)
				// ,'aiu_urok_defid' =>  $this->input->get_post('id', TRUE)
                 ,'aiu_urok_stage' =>  $this->input->get_post('nextstage', TRUE)
          );
		
         log_message('debug', 'NextState data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_urok_def_newstate', 'Values'=>$data ));
			log_message('debug', 'NextState result : '.json_encode($res));
			if( $res[0]->result=='OK'){
				log_message('debug', 'NextState return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'NextState return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
			
		} else {
			log_message('debug', 'NextState return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	 function TaskDone() {
		 log_message('debug', 'TaskDone post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'TaskDone get : '.json_encode($this->input->get(NULL, FALSE)));

		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'doer_comment' =>  $this->input->get_post('doer_comment', TRUE),
				'doer_states' =>  $this->input->get_post('doer_states', TRUE)
          );
         log_message('debug', 'TaskDone data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_task_done', 'Values'=>$data ));
			log_message('debug', 'TaskDone result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'TaskDone return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'TaskDone return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'TaskDone return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	
	 function TaskCheck() {
		 log_message('debug', 'TaskCheck post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'TaskCheck get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'controller_comment' =>  $this->input->get_post('controller_comment', TRUE)
         );
         log_message('debug', 'TaskCheck data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_task_check', 'Values'=>$data ));
			log_message('debug', 'TaskCheck result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'TaskCheck return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'TaskCheck return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'TaskCheck return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	function TaskCheckBad() {
		 log_message('debug', 'TaskCheckBad post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'TaskCheckBad get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'controller_comment' =>  $this->input->get_post('controller_comment', TRUE)
         );
         log_message('debug', 'TaskCheckBad data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_task_checkbad', 'Values'=>$data ));
			log_message('debug', 'TaskCheck result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'TaskCheckBad return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'TaskCheckBad return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'TaskCheckBad return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	 function TaskCancel() {
		 log_message('debug', 'TaskCancel post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'TaskCancel get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'doer_comment' =>  $this->input->get_post('doer_comment', TRUE)
          );
         log_message('debug', 'TaskCancel data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_task_cancel', 'Values'=>$data ));
			log_message('debug', 'TaskCancel result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'TaskCancel return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'TaskCancel return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'TaskCancel return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	
	function TaskDelegate() {
		 log_message('debug', 'TaskDelegate post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'TaskDelegate get : '.json_encode($this->input->get(NULL, FALSE)));

		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'doer' =>  $this->input->get_post('doer', TRUE)
          );
         log_message('debug', 'TaskDelegate data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_task_delegate', 'Values'=>$data ));
			log_message('debug', 'TaskDelegate result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'TaskDelegate return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'TaskDelegate return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'TaskDelegate return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	 function TaskStopDelegate() {
		 log_message('debug', 'TaskStopDelegate post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'TaskStopDelegate get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'controller_comment' =>  $this->input->get_post('controller_comment', TRUE)
          );
         log_message('debug', 'TaskStopDelegate data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_task_stopdelegate', 'Values'=>$data ));
			log_message('debug', 'TaskStopDelegate result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'TaskStopDelegate return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'TaskStopDelegate return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'TaskStopDelegate return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	
	 function UpdateTiming() {
		 log_message('debug', 'UpdateTiming post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'UpdateTiming get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'info' =>  $this->input->get_post('info', TRUE)
          );
         log_message('debug', 'UpdateTiming data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_timing_save', 'Values'=>$data ));
			log_message('debug', 'UpdateTiming result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'UpdateTiming return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'UpdateTiming return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'UpdateTiming return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	
    function CleanProcess() {
		 log_message('debug', 'CleanProcess post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'CleanProcess get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'processid' =>  $this->input->get_post('processid', TRUE)
          );
         log_message('debug', 'CleanProcess data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'ProcessClear', 'Values'=>$data ));
			log_message('debug', 'CleanProcess result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'CleanProcess return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'CleanProcess return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'CleanProcess return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	 function CopyProcess() {
		 log_message('debug', 'CopyProcess post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'CopyProcess get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'fromprocess' =>  $this->input->get_post('fromprocess', TRUE),
				'toprocess' =>  $this->input->get_post('toprocess', TRUE)
          );
         log_message('debug', 'CopyProcess data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'ProcessCopy', 'Values'=>$data ));
			log_message('debug', 'CopyProcess result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'CopyProcess return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'CopyProcess return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'CopyProcess return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	
	
	 function Subscribe() {
		 log_message('debug', 'Subscribe post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'Subscribe get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'eventtype' =>  $this->input->get_post('eventtype', TRUE),
				'theprocess' =>  $this->input->get_post('theprocess', TRUE),
				'processstatus' =>  $this->input->get_post('processstatus', TRUE),
				'statetask' =>  $this->input->get_post('statetask', TRUE),
				'doer' =>  $this->input->get_post('doer', TRUE),
				'thedoc' =>  $this->input->get_post('thedoc', TRUE),
				'thevideo' =>  $this->input->get_post('thevideo', TRUE),
				'thediscussion' =>  $this->input->get_post('thediscussion', TRUE)
          );
         log_message('debug', 'Subscribe data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'Subscribe', 'Values'=>$data ));
			log_message('debug', 'Subscribe result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'Subscribe return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'Subscribe return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'Subscribe return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
	
	function getTeacher()
    {
		log_message('debug', 'getTeacher post : '.json_encode($this->input->post(NULL, FALSE)));
		log_message('debug', 'getTeacher get : '.json_encode($this->input->get(NULL, FALSE)));
		
		$subj = $this->input->get_post('subject', TRUE);
		$metodist = $this->input->get_post('metodist', TRUE);
		$w='NotArchived(g2b(instanceid))=1';
		if (!empty($metodist)){
			$w=$w.' and iu_tmdef_ismethodist_val='.$metodist;
			if (!empty($subj)){
				$w=$w.' and iu_tmdef_subjects like \'%'.$subj.'%\' ' ;
			}
		}else{
			if (!empty($subj)){
				$w=$w.' and iu_tmdef_subjects like \'%'.$subj.'%\'' ;
			}
		}
		
	
		$res = $this->jservice->get(
			array(
				'Action' => 'GetViewData', 
				'ViewName' => 'v_autoiu_tmdef',
				
				'FieldList'=>'instanceid,id, id iu_tmdefid,
				concat(iu_tmdef_lastname,\' \',iu_tmdef_name,\' \',ifnull(iu_tmdef_surname,\'\'),\'(\',ifnull(iu_tmdef_thetown,\'\'),\')\') brief ,iu_tmdef_subjects subj ,iu_tmdef_ismethodist,iu_tmdef_classes',
				
				'Sort'=>'[ {"property":"iu_tmdef_lastname", "direction":"ASC"},{"property":"iu_tmdef_name", "direction":"ASC"},{"property":"iu_tmdef_surname", "direction":"ASC"}]',
				
				'WhereClause' => $w
			)
		);
		
		if (empty($res)) {
			$return= array('success' => FALSE, 'msg' => 'No data found');
		} else {
			$return= $res;
		}
        print json_encode($return);
    }
	
	
	function GetUrokProcess()
	{
		$id= $this->input->get_post('instanceid', TRUE);
	  
		$res = $this->jservice->get(array('Action' => 'GetUrokProcess', 'instanceid' =>$id));
		print json_encode($res);
	}

	function getUrokStatus()
    {
	
		$urokid = $this->input->get_post('urokid', TRUE);
		


		$res = $this->jservice->get(
			array(
				'Action' => 'GetViewData', 
				'ViewName' => 'v_iu_urokstatus',
				'FieldList'=>'*',
				'WhereClause' => 'urokid=\''.$urokid.'\''
			)
		);
		
		if (empty($res)) {
			$return= array('success' => FALSE, 'msg' => 'No data found');
		} else {
			$return= $res;
		}
        print json_encode($return);
    }
	
	
	function getTaskSN()
    {
	
		$taskid = $this->input->get_post('taskid', TRUE);
		


		$res = $this->jservice->get(
			array(
				'Action' => 'GetViewData', 
				'ViewName' => 'v_tasksn',
				'FieldList'=>'*',
				'WhereClause' => 'taskid=\''.$taskid.'\''
			)
		);
		
		if (empty($res)) {
			$return= array('success' => FALSE, 'msg' => 'No data found');
		} else {
			$return= $res;
		}
        print json_encode($return);
    }
	
	
	function getDelegates()
    {
	
		$res = $this->jservice->get(
			array(
				'Action' => 'GetDelegates'			
			)
		);
		
		if (empty($res)) {
			$return= array('success' => FALSE, 'msg' => 'No data found');
		} else {
			$return= $res;
		}
        print json_encode($return);
    }
	
	
	 function ProcessRestart() {
		 log_message('debug', 'ProcessRestart post : '.json_encode($this->input->post(NULL, FALSE)));
		 log_message('debug', 'ProcessRestart get : '.json_encode($this->input->get(NULL, FALSE)));
		
		 $data = array(
                'instanceid' =>  $this->input->get_post('instanceid', TRUE),
				'process' =>  $this->input->get_post('process', TRUE)
          );
         log_message('debug', 'ProcessRestart data : '.json_encode($data));
		if (!empty($data)) {
			$res=$this->jservice->get(array('Action' => 'Wizard', 'Name' => 'iu_urok_restart', 'Values'=>$data ));
			log_message('debug', 'ProcessRestart result : '.json_encode($res));
			if( $res[0]->result=='ok'){
				log_message('debug', 'ProcessRestart return : '.json_encode(array('success' => TRUE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => TRUE, 'msg' => $res[0]->result)));
			}else{
				log_message('debug', 'ProcessRestart return : '.json_encode(array('success' => FALSE, 'msg'=>$res[0]->result)));
				echo( json_encode(array('success' => FALSE, 'msg' => $res[0]->result)));
			}
		} else {
			log_message('debug', 'ProcessRestart return : '.json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
			echo(json_encode(array('success' => FALSE, 'msg' => 'No data to store on server')));
		}
		
    }
	
}
