import {readFileSync} from 'fs';
import {join} from 'path';
const _questionsJsonBody = readFileSync(join(__dirname, '../../questions.json'), 'UTF-8');
export const questions = JSON.parse(_questionsJsonBody);