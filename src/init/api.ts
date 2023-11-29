import * as api from "../api/index";

const g = globalThis as any;
g.cML = g.cML ?? api;
