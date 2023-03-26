const async = require('async');
const xlsx = require('xlsx');
const Candidate = require('../models/candidate');
const path = require('path');


exports.upload = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  async.eachSeries(
    sheet['!ref'].split(':')[1],
    (cell, callback) => {
      const email = sheet[`A${cell}`].v;

      Candidate.findOne({ email }, (err, candidate) => {
        if (err) {
          return callback(err);
        }

        if (candidate) {
          console.log(`Skipping candidate with email ${email} (already exists)`);
          return callback();
        }

        const candidateData = {
          name: sheet[`B${cell}`].v,
          email: sheet[`A${cell}`].v,
          phone: sheet[`C${cell}`].v,
          education: sheet[`D${cell}`].v,
          skills: sheet[`E${cell}`].v.split(',').map((skill) => skill.trim()),
          experience: sheet[`F${cell}`].v,
        };

        const candidateModel = new Candidate(candidateData);

        candidateModel.save((err) => {
          if (err) {
            return callback(err);
          }

          console.log(`Added candidate with email ${email}`);
          callback();
        });
      });
    },
    (err) => {
      if (err) {
        return res.status(500).send('An error occurred while processing the file');
      }

      res.status(200).send('File uploaded successfully');
    }
  );
};

exports.getUploadPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'upload.html'));
};

