const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const getDirName = require('path').dirname;
const ncp = require('ncp').ncp;
const rimraf = require('rimraf')
const archiver = require('archiver');

ncp.limit = 16;

const zipAsync = async (source, out) => {
  const tempPath = path.resolve(source) + Date.now()

  const archive = archiver('zip', { zlib: { level: 9 }});

  const stream = fs.createWriteStream(tempPath);

  await new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(stream)

    stream.on('close', () => resolve());
    archive.finalize();
  });

  await copyAsync(tempPath, out)
  await removeAsync(tempPath)
  return out
}

const unzipAsync = async (source, out) => {
  unzip.Open.file(source)
  .then(d => d.extract({path: out}));
}

const ensureDirAsync = (path) => {
  return new Promise((resolve, reject) => {
    mkdirp(path,  (err) => {
      if (err) {
        reject(err)
      }
      else {
        resolve()
      }
    });
  })
}

const readFileAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

const writeFileAsync = (path, contents) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contents, (err, data) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

const existsAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      }
      else {
        resolve(true)
      }
    })
  })
}

const copyAsync = async (source, destination) => {
  return new Promise((resolve, reject) => {
    ncp(source, destination, (err) => {
     if (err) {
       reject(err)
     }
     else {
       resolve()
     }
    })
  })
}

const removeAsync = async (path) => {
  return new Promise((resolve, reject) => {
    rimraf(path, {}, (err) => {
      if (err) {
        reject(err)
      }
      else {
        resolve()
      }
    })
  })
}

module.exports = {
  zipAsync,
  unzipAsync,
  readFileAsync,
  existsAsync,
  copyAsync,
  ensureDirAsync,
  writeFileAsync,
  removeAsync,
}
