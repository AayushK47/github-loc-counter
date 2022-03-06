import { Octokit } from "@octokit/rest";
import { exec } from 'child_process';
import { join, resolve, extname } from 'path';
import { readdir, lstat, readFile } from 'fs/promises';

import { ignoreList, includeExts, ext2Lang } from './config';

export function cloneRepos(): Promise<string> {
	return new Promise((resolve, reject) => {
		const octokit = new Octokit();
		octokit.request('GET /users/{username}/repos', {"username": "AayushK47"}).then(async (res) => {
			const repos = res.data.filter(repo => !repo.archived);
			let i = 0;
			exec('mkdir repos', () => {
				for(const repo of repos) {
					if(!repo.archived) {
						console.log(`Cloning ${repo.name}`);
						exec(`cd repos && git clone ${repo.clone_url}`, (error) => {
							if (error) {
								reject(`Error ${error}`);
							}
							console.log(`Repo ${repo.name} cloned successfully`);
							i++;
							if(i === repos.length) {
								resolve("All repos cloned successfully");
							}
						});
					}
				}
			});
		}).catch(error => {
			reject(error);
		});
	});
}

export async function scanFiles(repoName: string): Promise<string[]> {
  const root = resolve(join(__dirname, '..', 'repos', repoName));
  let dirs = await readdir(root);
  dirs = dirs.filter(item => !ignoreList.includes(item));
  dirs = dirs.map(item => join(root, item));
  const files = [];

  while(dirs.length > 0) {
    const name = dirs.pop() || "";
    if(await (await lstat(name)).isDirectory()) {
      let dir = await readdir(name);
      dir = dir.map(item => join(name, item));
      dir.forEach(item => dirs.push(item));
    } else {
      files.push(join(name));
    }
  }
  return files;
}

export async function fetchLoc(files: string[]): Promise<{ [key: string]: number }> {
	const loc: { [key: string]: number } = {};
	for(const file of files) {
		const ext = extname(file);
		const key = ext2Lang[ext];
		if(includeExts.includes(ext)) {
			const content = await readFile(file, 'utf8');
			if(ext === '.ipynb') {
				let lines = 0;
				for(const obj of JSON.parse(content).cells) {
					if(obj.cell_type === 'code') {
						lines += obj.source.length;
					}
				}
				if(loc.hasOwnProperty(key)) {
					loc[key] += lines;
				} else {
					loc[key] = lines;
				}
			} else if(loc.hasOwnProperty(key)) {
				loc[key] += content.split("\n").filter(line => line !== '').length;
			} else {
				loc[key] = content.split("\n").filter(line => line !== '').length;
			}
		}
	}
	console.log(loc);
	return loc;
}