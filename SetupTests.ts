import 'reflect-metadata'
import 'dotenv/config'
import * as path from 'path'

// Sobrescribe el archivo de entorno por defecto
require('dotenv').config({ path: path.resolve(__dirname, './.env.test') })
