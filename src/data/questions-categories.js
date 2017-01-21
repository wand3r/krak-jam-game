import {readFileSync} from 'fs';
import {join} from 'path';
const _questionsJsonBody = readFileSync(join(__dirname, '../../questions-categories.json'), 'UTF-8');
export const questionsCategories = JSON.parse(_questionsJsonBody);