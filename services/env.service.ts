import { Service } from 'typedi';

@Service()
export class EnvService {
    BACKEND_URL = process.env.BACKEND_URL ?? 'https://api.tiny-crm.biz.ua/';
}
