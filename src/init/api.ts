import * as api from "../api/index.js";

const g = globalThis as any;
g.cML = g.cML ?? api;
