"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config_1 = require("../config/config");
const repositories_1 = require("../repositories");
const jwt = require('jsonwebtoken');
// Nuevas librerias
const generator = require("password-generator");
const cryptoJS = require("crypto-js");
let AuthService = class AuthService {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    /*
     * Add service methods here
     */
    //Generacion de claves
    GenerarClave() {
        let clave = generator(8, false);
        return clave;
    }
    CifrarClave(clave) {
        let claveCifrada = cryptoJS.MD5(clave).toString();
        return claveCifrada;
    }
    //JWT
    GenerarTokenJWT(usuario) {
        let token = jwt.sign({
            data: {
                id: usuario.id,
                correo: usuario.correo,
                nombre: usuario.nombre + " " + usuario.apellidos
            }
        }, config_1.config.claveJWT);
        return token;
    }
    validarTokenJWT(token) {
        try {
            let datos = jwt.verify(token, config_1.config.claveJWT);
            return datos;
        }
        catch (error) {
            return false;
        }
    }
    //Autenticacion
    IdentificarPersona(correo, password) {
        try {
            let p = this.usuarioRepository.findOne({ where: { correo: correo, password: password } });
            if (p) {
                return p;
            }
            return false;
        }
        catch (_a) {
            return false;
        }
    }
};
AuthService = (0, tslib_1.__decorate)([
    (0, core_1.injectable)({ scope: core_1.BindingScope.TRANSIENT }),
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.UsuarioRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.UsuarioRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map