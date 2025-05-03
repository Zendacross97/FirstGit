const Attendance = require('../models/attendanceModel');

exports.getAttendance = async (req, res) => {
    try {
        const { date } = req.params;
        if (!date) {
            return res.status(400).json({ error: 'Date parameter is required' });
        }
        const attendance = await Attendance.findAll({
            where: { Date: date } 
        });
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addAttendance = async (req, res) => {
    try {
        const { Date, Siva, Rajesh, Ashok, Sai, Haritha, Ram, Krishna, Anu, Ammu, Adi, Venkat } = req.body;
        if (!Date || !Siva || !Rajesh || !Ashok || !Sai || !Haritha || !Ram || !Krishna || !Anu || !Ammu || !Adi || !Venkat) {
            throw new Error(' Attendance form is incomplete' )
        }
        const attendance = await Attendance.create({ Date, Siva, Rajesh, Ashok, Sai, Haritha, Ram, Krishna, Anu, Ammu, Adi, Venkat });
        res.status(201).json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAttendanceReport = async (req, res) => {
    try {
        const total = await Attendance.count();
        const siva = await Attendance.count({ where: { Siva: 'present' } });
        const rajesh = await Attendance.count({ where: { Rajesh: 'present' } });
        const ashok = await Attendance.count({ where: { Ashok: 'present' } });
        const sai = await Attendance.count({ where: { Sai: 'present' } });
        const haritha = await Attendance.count({ where: { Haritha: 'present' } });
        const ram = await Attendance.count({ where: { Ram: 'present' } });
        const krishna = await Attendance.count({ where: { Krishna: 'present' } });
        const anu = await Attendance.count({ where: { Anu: 'present' } });
        const ammu = await Attendance.count({ where: { Ammu: 'present' } });
        const adi = await Attendance.count({ where: { Adi: 'present' } });
        const venkat = await Attendance.count({ where: { Venkat: 'present' } });
        const attendance = {
            Siva: `${siva}/${total}    =>${Math.round((siva / total) * 100)}%`,
            Rajesh: `${rajesh}/${total}    =>${Math.round((rajesh / total) * 100)}%`,
            Ashok: `${ashok}/${total}    =>${Math.round((ashok / total) * 100)}%`,
            Sai: `${sai}/${total}    =>${Math.round((sai / total) * 100)}%`,
            Haritha: `${haritha}/${total}    =>${Math.round((haritha / total) * 100)}%`,
            Ram: `${ram}/${total}    =>${Math.round((ram / total) * 100)}%`,
            Krishna: `${krishna}/${total}    =>${Math.round((krishna / total) * 100)}%`,
            Anu: `${anu}/${total}    =>${Math.round((anu / total) * 100)}%`,
            Ammu: `${ammu}/${total}    =>${Math.round((ammu / total) * 100)}%`,
            Adi: `${adi}/${total}    =>${Math.round((adi / total) * 100)}%`,
            Venkat: `${venkat}/${total}    =>${Math.round((venkat / total) * 100)}%`
        }
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};