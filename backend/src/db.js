async function selectCars(){
    if(global.connection && global.RTCPeerConnection.state !== 'disconnected')
        return global.connection;

    const mysql=require("mysql2/promise");
    const conn =await mysql.createConnection("mysql://consulta1:ttbenfica81!@192.168.0.196:3306/mclient");
    console.log("conectou no MYSQL");
    const [rows] = await conn.execute('select cv.cvei_id id, cv.cvei_frota prefix, cv.cvei_placa board, lup.lupo_latitude latitude, lup.lupo_longitude longitude, lup.lupo_velocidade speed from cad_veiculo cv, log_ultima_posicao lup where lup.lupo_cvei_id=cv.cvei_id');
    await conn.end();

    return rows;
    // global.connection=connection;
    // return connection;
}

// async function selectCars(){
//     const conn=await connect();
//     const [rows]=await conn.query('select cv.cvei_id id, cv.cvei_frota prefix, cv.cvei_placa board, lup.lupo_latitude latitude, lup.lupo_longitude longitude, lup.lupo_velocidade speed from cad_veiculo cv, log_ultima_posicao lup where lup.lupo_cvei_id=cv.cvei_id');
//     await conn.end();
//     return rows;


// }

module.exports = {selectCars}
