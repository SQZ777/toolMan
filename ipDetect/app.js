import 'dotenv/config';
import axios from "axios";
import fs from 'fs';

async function getCurrentIp() {
    const result = axios.get('http://ifconfig.me').then((res) => {
        return res.data;
    })
    return result;
}

async function checkFile() {
    if (!fs.existsSync(process.env.IP_FILE)) {
        fs.writeFileSync(process.env.IP_FILE, '');
    }
}

async function writeFile(content){
    fs.writeFileSync(process.env.IP_FILE, content);
}

async function getLastRecordIp() {
    const ip = fs.readFileSync(process.env.IP_FILE, 'utf8');
    return ip;
}

async function getChangedIp() {
    checkFile();
    const lastIp = await getLastRecordIp();
    const currentIp = await getCurrentIp();
    if (lastIp === '' || lastIp !== currentIp) {
        await writeFile(currentIp);
        return currentIp;
    }
    return false;
}

export default getChangedIp;
