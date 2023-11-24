import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD
 */

let markdownText = `[![Readme Update](https://github.com/ParkSeYun98/Tistory/actions/workflows/main.yml/badge.svg)](https://github.com/ParkSeYun98/Tistory/actions/workflows/main.yml)`;

let text = `
${markdownText}\n

# Hi there 👋

#### GitHub Actions와 Tistory RSS를 활용한 Tistory 자동 Commit 시스템

- Tistory에 게시글을 업로드하면 Cron을 활용하여 1시간 마다 Commit을 통해 잔디를 심을 수 있다!!!

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://developisntcool.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 5; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href=${link}>${title}</a></br>`;
    }

    // README.md 파일 작성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    })

    console.log('업데이트 완료')
})();
