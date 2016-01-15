var logged = false;
var login=null;
function doLogin()
{
		var form=login.getForm();
		if (!form.isValid()) {
            return;
        }
		form.submit({
			method:'POST',
			waitTitle:'Соединение',
			waitMsg:'Отсылка данных...', 
			success:function () {
				logged = true;
				login.ownerCt.close();
				MyInit();
			},

			failure:function (form, action) {
				if (action.failureType == 'server') {
					//obj = Ext.util.JSON.decode(action.response.responseText);
					Ext.Msg.alert('Ошибка авторизации!', 'Неверный пароль или такой пользователь не найден.');
				} else {
					Ext.Msg.alert('Внимание!', 'Сервер недоступен : ' + action.response.responseText);
				}
				logged = false;
			}
		});
    
}

login = new Ext.FormPanel({
	
    labelWidth:80,
    url:rootURL+'index.php/app/login',
    frame:true,
	height:'100%',
    title:'',
    defaultType:'textfield',
    monitorValid:true,
    // Specific attributes for the text fields for username / password.
    // The "name" attribute defines the name of variables sent to the server.
    items:[
        {
            fieldLabel:'Пользователь',
            name:'loginUsername',
            allowBlank:false,
            value:''
			,listeners: {
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						doLogin();
					}
				}
			}
        },
        {
            fieldLabel:'Пароль',
            name:'loginPassword',
            inputType:'password',
            allowBlank:false,
            value:''
			,listeners: {
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						doLogin();
					}
				}
			}
        }
    ],
    // All the magic happens after the user clicks the button
    buttons:[
        {
            text:'Login',
			iconCls: 'icon-key_go',
            formBind:true,
            // Function that fires when user clicks the button
            handler:doLogin
        }
    ]
	


});


// This just creates a window to wrap the login form.
// The login object is passed to the items collection.
var login_win = new Ext.Window({
    title:'Авторизация',
	
	itemId:'login_win',
    layout:'fit',
	constrainHeader:true,
    width:280,
    height:120,
    closable:false,
    modal:true,
    resizable:false,
    plain:true,
    border:false,
    items:[login]
	
	
});

function UserLogin(){
	login_win.show();
}
  
