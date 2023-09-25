import express from "express";
import cors from "cors";
import session from "express-session";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

// route admin
import UserRoute from "./routes/Admin/UserRoute.js";
import PegawaiRoute from "./routes/Admin/PegawaiRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BidangRoute from "./routes/Admin/BidangRoute.js";
import PangkatRoute from "./routes/Admin/PangkatRoute.js";
import GolonganRoute from "./routes/Admin/GolonganRoute.js";

// route user
import SuratRouteUser from "./routes/Users/SuratRoute.js";
import DistribusiRouteUser from "./routes/Users/DistribusiRoute.js";

// router agendaris
import SuratRouteAgend from "./routes/Agendaris/SuratAgendRoute.js";
import BidangRouteAgend from "./routes/Agendaris/BidangAgendRoute.js";

const app = express();

/**
 * @param sessionStore membuat session ketika login
 * @param store menambahkan session yang dibuat ke dalam tabel session
 */
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});
// (async()=>{
//     await db.sync();
// })();

/**
 * @return fungsi untuk mengatur session
 * @param secret untuk secret session
 */
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto', // if use http using false, if https using true
    }
}));

/**
 * @return fungsi untuk menentukan url
 * @param credentials frontend dapat mengirimkan cookie dengan credentialsnya
 * @param origin alamat url domain, bisa juga menggunakan tanda kurung [] untuk banyak domain
 */
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));


/**
 * @return fungsi untuk menjalankan aplikasi
 * @param APP_PORT diambil dari file .env
*/
app.listen(process.env.APP_PORT, () => {
    console.log('Server hidup dan berjalan..');
});

/**
 * @return fungsi agar dapat menerima data dalam bentuk json
 */
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

// route admin
app.use(AuthRoute);
app.use(UserRoute);
app.use(PegawaiRoute);
app.use(BidangRoute);
app.use(PangkatRoute);
app.use(SuratRouteUser);

// route user
app.use(GolonganRoute);
app.use(DistribusiRouteUser);

// route agendaris
app.use(SuratRouteAgend);
app.use(BidangRouteAgend);

// store.sync(); //membuat tabel session untuk menyimpan session login
