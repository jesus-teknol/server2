/**
 * 
 */
var express = require("express");
var app = express();
const mongoose = require("./mongooseClients");

////BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

///se selecciona el puerto donde esete trabajando o si no se usa el 3000
const PORT = process.env.PORT || 3000;
//////Utilizar modelo messageModel y dataClient Model
const Message = require('./messageModel') ///nombre archivo messageModel.js 
const DataClientMsg = require('./dataClientMsgModel') ///nombre archivo dataClientMsg.js 

///READ  default navegadores
app.get('/',function(request,response){
	response.send("Petición tipo GET nodemon node.js JASHIMOTO TEST");
});

///CRUD
// base de datos para almacenamiento de datos medidos
///Crud dataClientMsg para los módulos 

///UPDATE utiliza el (ID del cliente) 
app.put('/api/v1/dataClientMsg/:aid',(request,response)=>{
	let {aid} = request.params;
	const {data}=request.body;
	
	let updateDataClientMsg = {
			data
	}
	DataClientMsg.findByIdAndUpdate(aid,updateDataClientMsg,{new : true}).exec()
	.then(success =>{ ///success = alumno editado
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});
////READ by cliente (por lo menos una vez al iniciar para obtener el ID del registro a actualizar)

app.get('/api/v1/dataClientMsg/:client',(request,response)=>{
    let {client} = request.params;
    let findDataClientMsg = {
        client
    }
	DataClientMsg.find(findDataClientMsg).exec()
	.then(success =>{ ///Success es == a la lista de alumnos encontrados
          
        response.status(200).send(success[0]);
        /* Para ver respuesta, find devuelve un arreglo con todas las coinsidencias
        let arrSuccess = success;
        let idx = arrSuccess[0];
        console.log(idx._id);
        */
        })
	.catch(error =>{
		response.status(404).send(error);
	});
});

///////////////////////////////////////////////////////////////////
/////////CRUD Para utilizar en el FrontEND
///READ ALL Todas las Lecturas de las estaciones

/////////////////////////////////////////////////////////

app.get('/frontEnd/v1/estaciones/',(request,response)=>{
	DataClientMsg.find().exec()
	.then(success =>{ ///Success es == a la lista de Estaciones encontrados
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});

///CREATE http://localhost/frontEnd/v1/estaciones/
///crear la primer tabla donde descargar la información

app.post('/frontEnd/v1/estaciones/',(request,response)=>{
    const {client,data} = request.body;
	let nuevodataClientMsg = DataClientMsg({
        client: client,
        data: data
        // dht1_temp:dht1_temp, 
        // dht1_hmd:dht1_hmd, 
        // dht2_temp:dht2_temp, 
        // dht2_hmd:dht2_hmd, 
        // tr1_temp:tr1_temp, 
        // tr2_temp:tr2_temp, 
        // core_temp:core_temp, 
        // ac_state:ac_state, 
        // sec_remain:sec_remain, 
        // temp_max:temp_max, 
        // temp_min:temp_min, 
        // adj_R1:adj_R1, 
        // adj_R2:adj_R2, 
        // TPR:TPR
	});
	nuevodataClientMsg.save((error,success)=>{
		if(error) throw error;
		response.status(201).send(success);
	});
});


////DELETE (para borrar registros de los clientes pero no accessible por el cliente solo el admin)
app.delete('/frontEnd/v1/estaciones/:aid',(request,response)=>{
	let {aid} = request.params;
	DataClientMsg.findByIdAndDelete(aid).exec()
	.then(success => {
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
		});
});
//Fin dataClient
////////////////

///////////////////////////////////////
//Inicio messageModel
//  /frontEnd/message/estaciones/:client
//  Message  (Object)
////Mensajes entre frontEnd <=> estaciones
///READ ALL
app.get('/frontEnd/message/estaciones/',(request,response)=>{
	Message.find().exec()
	.then(success =>{ ///Success es == a la lista de alumnos encontrados
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});

/////Read By Client
app.get('/frontEnd/message/estaciones/:client',(request,response)=>{
    let {client} = request.params;
    let findDataClientMsg = {
        client
    }
	Message.find(findDataClientMsg).exec()
	.then(success =>{ 
          
        response.status(200).send(success[0]);
        /* Para ver respuesta, find devuelve un arreglo con todas las coinsidencias
        let arrSuccess = success;
        let idx = arrSuccess[0];
        console.log(idx._id);
        */
        })
	.catch(error =>{
		response.status(404).send(error);
	});
});

////Crear message en modelo message
app.post('/frontEnd/message/estaciones/',(request,response)=>{
    const {client,
    	controlWord,
    	temp_max, 
    	temp_min, 
    	adj_R1, 
    	adj_R2, 
    	TPR,
    	controlStatus} = request.body;
	let nuevodataMessage = Message({
        client,
    	controlWord,
    	temp_max, 
    	temp_min, 
    	adj_R1, 
    	adj_R2, 
    	TPR,
    	controlStatus
	});
	nuevodataMessage.save((error,success)=>{
		if(error) throw error;
		response.status(201).send(success);
	});
});

///UPDATE utiliza el (ID del cliente) 
app.put('/frontEnd/message/estaciones/:aid',(request,response)=>{
	let {aid} = request.params;
	const {controlWord,temp_max,temp_min,adj_R1,adj_R2,TPR,controlStatus}=request.body;
	
	let updateDataClientMsg = {
		controlWord,
		temp_max,
		temp_min,
		adj_R1,
		adj_R2,
		TPR,
		controlStatus
	}
	Message.findByIdAndUpdate(aid,updateDataClientMsg,{new : true}).exec()
	.then(success =>{ ///success = registro editado
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});

app.delete('/frontEnd/message/estaciones/:aid',(request,response)=>{
	let {aid} = request.params;
	Message.findByIdAndDelete(aid).exec()
	.then(success => {
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
		});
});

///Fin
///////////////////////////////////////////


app.listen(PORT,function(){
	console.log("Escuchando por el puerto: 3000");
});



/*  
///READ ALL
app.get('/api/v1/alumnos/',(request,response)=>{
	Alumno.find().exec()
	.then(success =>{ ///Success es == a la lista de alumnos encontrados
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});

///READ by ID
app.get('/api/v1/alumnos/:aid',(request,response)=>{
	let {aid} = request.params;
	Alumno.findById(aid).exec()
	.then(success =>{ ///Success es == a la lista de alumnos encontrados
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});

///UPDATE
app.put('/api/v1/alumnos/:aid',(request,response)=>{
	let {aid} = request.params;
	const {nombre,apellidos,edad,email,ciudad}=request.body;
	
	let updateAlumno = {
			nombre: nombre,
			apellidos:apellidos,
			edad: edad,
			email:email,
			ciudad:ciudad
	}
	Alumno.findByIdAndUpdate(aid,updateAlumno,{new : true}).exec()
	.then(success =>{ ///success = alumno editado
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
	});
});



////DELETE
app.delete('/api/v1/alumnos/:aid',(request,response)=>{
	let {aid} = request.params;
	Alumno.findByIdAndRemove(aid).exec()
	.then(success => {
		response.status(200).send(success);
	})
	.catch(error =>{
		response.status(404).send(error);
		});
});
*/


