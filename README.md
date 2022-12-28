<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://miro.medium.com/max/650/1*oAwGDARfOzWoZnq1Rhingg.png" width="200" alt="Nest Logo" />
  </a>
  </p>
<div style="font-size:12px;"> <b>작성자 : </b> 장현욱 (wkdgusdnr55@gmail.com)</div>

# 목차
1. [문서](#문서)
2. [서버실행](#raised_hands-서버실행)
3. [아키텍쳐](#books-아키텍쳐)
4. [Quick Start](#bookmark-Quick-Start)
    - [페이지와 레이아웃](#페이지와-레이아웃)
    - [스타일과 테마](#스타일과-테마)
    - [라우터 제어](#라우터-제어)
    - [상태관리](#상태관리)
    - [데이터 정적파일 매핑](#데이터-정적파일-매핑)
 
# 문서

- :closed_book: **Official Doc** : https://nextjs.org/docs
- :blue_book: **Author Doc** : https://velog.io/@artlogy/series/Next.js

# :raised_hands: 서버실행

서버를 빠르게 실행하는 법입니다.
```bash
# 개발환경으로 실행
$ npm install
$ npm run dev
```

```bash
# 배포환경으로 실행
$ npm install
$ npm run start
```

```bash
# 빌드 
$ npm install
$ npm run build
```

# :books: 아키텍쳐

디렉토리 구조입니다.

```shell
📦 public # 정적리소스를 관리하는 곳
📦 src
 ┣ 📂 apis # api 요청 매서드를 정의하는 곳
 ┃┣ 📜 app.config.ts  # axios 설정과 선언값을 설정하는 곳
 ┃┣  📂 movies # 참고용으로 만든 요청 폴더
 ┃┃┣ 📜 movie.api.get.ts  # 참고용으로 만든 get method정의 파일
 ┣ 📂 components # 컴포넌트를 관리하는 곳
 ┃┣  📂 layouts # layouts제작시 참고용으로 만든 곳
 ┃┣  📂 charts # 커스텀 컴포넌트 제작시 참고용으로 만든 곳
 ┃┣  📂 texts # 텍스트 관련 컴포넌트
 ┣ 📂 pages # 앱의 페이지(라우트)를 정의하는 곳
 ┃┣  📂 notice # 라우트 생성시 참고용으로 만든 곳
 ┃┃┣ 📜 [id].tsx  # params가 존재하는 페이지 생성시 [query]형태로 파일을 만듦 그 참고용 파일
 ┃┃┣ 📜 index.tsx # 해당 path에 루트 페이지는 "index"라는 이름으로 파일을 만듦 그 참고용 파일
 ┃┣ 📜 _app.tsx # 가장 기본이 되는 컴포넌트 단위 React에서 index.js와 같음
 ┃┣ 📜 index.tsx # 루트 페이지
 ┣ 📂 styles # 앱전체적으로 사용 될 스타일을 정의하는 곳
 ┃┣ 📜 global.antd.less # ANTD 컴포넌트의 전역적인 스타일을 설정하는 곳
 ┃┣ 📜 global.css # 앱 전역적인 스타일을 설정하는 곳
 ┃┣ 📜 theme.ts # 앱의 테마스타일을 설정하는 곳 ( ex: primaryColor )
 ┣ 📂 states # 클라이언트 데이터 상태관리하는 곳
 ┃┣ 📜 config.state.ts # 상태관리 Atom 선언 파일
```
---
# :bookmark: Quick Start

### 목표
  - 페이지를 생성하고 레이아웃을 적용해봅니다.
  - 원하는 theme와 style을 적용해 봅니다.
  - useRouter()를 활용하여 페이지간 이동을 제어합니다.
  - ReactQuery와 Recoil을 활용해 서버데이터와 클라이언트데이터 상태관리를 해봅니다.
  - 서버데이터를 정적파일에 바인딩하여 SEO에 유리하도록 해봅니다.
## 페이지와 레이아웃
### 페이지 생성
사용자가 URL로 접근가능한 페이지를 생성하기 위해선 pages폴더에 파일을 생성해주면됩니다.</br>
예시로 pages폴더 하위에 `hello.tsx`파일을 만들고 다음과 같이 작성해보겠습니다.

*pages/hello.tsx*
```tsx
const Hello = () => {
  return <h1>Hello</h1>;
};

export default Hello;
```

![image](https://user-images.githubusercontent.com/117614036/208012995-0c43b1f8-96c8-40f8-8167-1bb1f713129e.png)
</br>생성된 파일의 이름이 `pathname`입니다.
> 🔥 예외적으로 `index`이름을 가진 파일은 root경로의 페이지 파일이 됩니다.

---

### 페이지 경로 구조
만약 루트경로를 정하고 해당 경로를 기준으로 페이지를 만들고 싶을땐 폴더를 만드시면 됩니다.</br>
예시로 pages폴더 하위에 `sample`폴더를 만들고 `index.tsx`와 `hello.tsx`를 만들어 보겠습니다.

*pages/sample/index.tsx*
```tsx
const SampleIndex = () => {
  return <h1>나는 루트경로!</h1>;
};

export default SampleIndex;
```
*pages/sample/hello.tsx*
```tsx
const Hello = () => {
  return <h1>Hello</h1>;
};

export default Hello;
```
![image](https://user-images.githubusercontent.com/117614036/208013950-0ddeedf8-8380-42ca-978f-2a744d37cad2.png) </br>
![image](https://user-images.githubusercontent.com/117614036/208014073-961c1acc-9057-4124-88fe-f0535f9907d2.png)

---
### 동적 페이지
페이지 중에는 query를 이용하는 동적 페이지 존재합니다.</br>
params를 받는 페이지는 **["paramsname"]** 형태로 파일이름을 작성하시면 됩니다.</br>
*pages/notice/[id].tsx*
```tsx
import { useRouter } from "next/router";
import React from "react";

const NoticeSample: React.FC = () => {
  const router = useRouter();

  return <h1>Current Query is {router.query?.id}</h1>;
};

export default React.memo(NoticeSample);
```
![image](https://user-images.githubusercontent.com/117614036/208016897-456ef03c-aee5-45ee-a31b-313d604fc100.png) </br>
앤드포인트의 query값과 params값은 `next/router`의 `useRouter`를 이용하여 접근 할 수 있습니다.

> 🔥 만약 여러개의 params가 필요하다면 `[pram1][pram2]`또는 `[...prams]`형태로 파일이름을 작성하시면 됩니다.</br>
더 자세한 내용은 [이곳](https://nextjs.org/docs/routing/dynamic-routes)에서 확인이 가능합니다.

### 레이아웃
#### 글로벌 레이아웃
모든 페이지마다 고정된 레이아웃을 넣을 땐 다음과 같이 설정합니다. </br>
*pages/_app.tsx*
```tsx
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ConfigProvider theme={AppTheme}>
    //Component를 layout으로 감싸주면 모든 페이지 컴포넌트는 DefaultLayout의 children이 됩니다.
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ConfigProvider>
  );
}
```
#### 지역 레이아웃
페이지마다 적용되는 레이아웃이 다를 경우 다음과 같이 설정합니다.</br>
*pages/notice/[id].tsx*
```tsx
// NextpageWithLayout 타입으로 함수형페이지 컴포넌트를 선언하시면 됩니다.
const NoticeSample: NextPageWithLayout = () => {
  const router = useRouter();

  return <h1>Current Query is {router.query?.id}</h1>;
};

export default React.memo(NoticeSample);

NoticeSample.getLayout = (page: ReactElement) => {
  // 여기서 page는 NoticeSample을 뜻합니다.
  //적용하고 싶은 레이아웃의 children으로 page를 넣어주시면 됩니다.
  return <LocalLayout>{page}</LocalLayout>;
};

```
---
## 스타일과 테마
요소의 스타일은 스코프영역을 기준으로 `styled-components < global.antd < theme < global.css` 순으로 적용 하시는걸 추천드립니다.
### styled-components 사용
스타일 컴포넌트를 이용하면 해당 컴포넌트에서만 적용될 요소의 스타일을 작성 할 수 있습니다.
#### HTML Element
```tsx
import styled from "styled-components";

const styleIndex = () => {
  return <CustomDiv>스타일 컴포넌트 커스텀 DIV</CustomDiv>;
};

export default styleIndex;
//핵심은 styled객체를 쓰는 것!
const CustomDiv = styled.div`
  width: 200px;
  height: 180px;
  background-color: #1d4f7a;
`;
```

#### Component Element
antd컴포넌트나 우리가 커스텀한 컴포넌트의 경우 다음과 같이 스타일을 적용합니다.
```tsx
import { Button } from "antd";
import styled from "styled-components";

const styleIndex = () => {
  return <CustomButton>버튼 </CustomButton>;
};

export default styleIndex;
//컴포넌트는 이렇게 정의해주세요!
const CustomButton = styled(Button)`
  width: 100px;
  height: 200px;
`;
```

#### theme사용
theme는 앱의 대표컬러나 배너의 크기등 앱의 전체적인 스타일값을 정의하는 곳입니다. </br>
만약 대표컬러를 바꾸고 싶다면 다음과 같이 type="primary"설정 또는 styled-components의 변수값으로써 사용이 가능합니다.
```tsx
import { ThemeConfig } from "antd/es/config-provider/context";

export const AppTheme: ThemeConfig | undefined = {
  token: {
    colorPrimary: "#FED645",
  },
};
```
##### type=primary의 예
```tsx
import { Button } from "antd";

const styleIndex = () => {
  //색깔이 theme에서 설정한 #FED645값으로 설정됩니다.
  return <Button type="primary">버튼 </Button>;
};

export default styleIndex;
```
##### styled-components의 예
```tsx
import { Button } from "antd";
import { AppTheme } from "src/styles/theme";
import styled from "styled-components";

const styleIndex = () => {
  return <CustomButton>버튼 </CustomButton>;
};

export default styleIndex;

//설정한 컬러값으로 버튼 스타일이 정의 될것입니다.
const CustomButton = styled(Button)`
  background-color: ${AppTheme?.token?.colorPrimary};
`;
```

---

## 라우터 제어
버튼을 눌렀을 때 다른페이지로 이동하거나 뒤로가기, 앞으로가기, 새로고침을 구현하고 싶을땐 </br>
다음과 같은 과정을 따릅니다.
### 정적경로
핵심은 `next/link`의 `Link`컴포넌트입니다. </br>
*예시*
```tsx
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  )
}

export default Home
```
각각의 경로는 pages폴더의 구조를 매핑합니다.
- **/** -> pages/index.tsx
- **/about** -> pages/about.tsx 또는 pages/about/index.tsx
- **blog/hello-word** -> pages/blog/hello-word.tsx 또는 pages/blog/[string].tsx
> 🔥 페이지 경로 우선순위
> 1. 정적경로 ex) pages/home.tsx
> 2. 동적경로 ex) pages/[id].tsx
> 3. 동적배열경로 ex) pages/[...id].tsx

### 동적 경로
값에 따라 다르거나 query나 params가 동적으로 변하는 경로 또한 `Link`를 이용합니다.
```tsx
import Link from 'next/link'

function Posts({ posts }) {
  return (
    //첫번째 방법
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          //문자 호환성을 위해 encodeURIComponent를 사용함.
          <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
    //두번째 방법 (추천!!)
     <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },  
            }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
```

### 뒤로가기 & 앞으로가기 & 새로고침

#### 뒤로가기(back)
```tsx
router.back();
```
#### 앞으로가기(forward)
```tsx
router.forward();
```
#### 새로고침(reload)
```tsx
router.reload();
```

> 🔥뒤로가기 & 앞으로가기는 앱의 히스토리기록을 기준으로 판단합니다.</br>
> 라우터 제어에 대한 더 자세한 내용은 다음 링크를 활용해보세요!</br>
> [Router Controll](https://velog.io/@artlogy/PageRoute#route)

## 상태관리
클라이언트데이터 상태관리는 `Recoil`, 서버데이터 상태관리는 `ReactQuery`를 이용합니다.
### Recoil
#### 관리 할 데이터 만들기
전역적으로 관리 할 클라이언트 데이터가 있다면 다음과 같은 작업을 따릅니다.</br>
*state/config.state.ts*
```tsx
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist()
// 핵심은 atom을 이용해 unique한 key값과 초기값을 넣어주는 것입니다.
export const principalState = atom({ key: "principal", default: "Jane Doe" });

// 만약 새로고침&페이지 이동시에도 데이터를 유지하고 싶다면 다음과 같이 선언합니다.
// 핵심은 effects_UNSTABLE:[persistAtom]을 추가하는 것 입니다.
// export const principalState = atom({ key: "principal", default: "Jane Doe",effects_UNSTABLE: [persistAtom], });
```

#### 데이터 사용하기
데이터를 사용 할 땐 선언한 상태변수를 가져와  `useRecoilState()`에 매개변수로 넣어줍니다.
기본 형태는 `React.useState`와 똑같습니다.
```tsx
import { principalState } from "./state/config.state";

const SampleIndex = ()=>{
  //React.useState처럼 0번째 인덱스는 값, 1번째 인덱스는 setter입니다.
	const [principal, setPrincipal] = useRecoilState(principalState);
  	const onChange = (event) => {
      console.log(principal);
    	setPrincipal(event.target.value);
    }
}
```

> 🔥 Recoil에 대해 더 알고싶다면 [링크](https://velog.io/@artlogy/Recoil)를 이용하세요!

---

### ReactQuery
서버데이터는 ReactQuery를 사용합니다.
ReactQuery를 사용하면 캐싱, 최적화등 이점이 많습니다!

#### Get Method
값을 불러올때 주로 쓰는 `Get` method의 요청은 다음과 같이 `useQuery`를 이용합니다.</br>
*pages/index.tsx*
```tsx
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  // 여기서 any가 설정되어 있는 곳은 응답된 서버data의 type입니다. (왠만하면 any말고 type을 선언해서 쓰는걸 추천합니다.)
  const movieData = useQuery<any,Error>(["getPopularMovie", currentPage], () =>
    GetPopular(currentPage)
  );
  ...
    return (
    <>
	...
      <Table
        loading={movieData.isLoading}
	// 이렇게 쓰시면 됩니다.
        dataSource={movieData.data?.results}
        columns={columns}
        size={"middle"}
        pagination={false}
      ></Table>
    </>
  );
  ...
```

#### Post Method
값을 추가/삭제/변경 할 때 주로 쓰이는 `Post` method는 `useMutation`을 이용합니다.
```tsx
// useMutate 정의
const savePerson = useMutation((person: Iperson) =>axios.post('http://localhost:8080/savePerson', person)); 
const onSavePerson = () => {
   savePerson.mutate(person); // 사용
}

```

> 🔥 지금까지는 ReactQuery를 활용한 최소한의 사용법입니다. </br>
> 더 많은 정보는 다음 링크를 참고하세요. </br>
> [Official](https://tech.osci.kr/2022/07/13/react-query/) </br>
> [Wooklogy](https://velog.io/@artlogy/React-Query-7uctt9a1)

## 데이터 정적파일 매핑
서버데이터를 불러와 정적파일에 매핑할때는 주로 `getServerSideProps`를 사용합니다. </br>
위에서 언급한 ReactQuery를 이용해 서버데이터를 관리함과 동시에 정적파일에 매핑해보겠습니다.
```tsx
// pages/posts.jsx
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from "next";

// getServerSideProps는 새로고침하거나 페이지가 전환 될 때마다 실행됩니다.
export const getServerSideProps: GetServerSideProps = async (context) =>() {
	const queryClient = new QueryClient()
	
	//중요!
	await queryClient.prefetchQuery('posts', getPosts)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

function Posts() {
	//핵심은 prefetchQuery에서 사용한 키값이 동일해야합니다.
	const { data } = useQuery(['posts'], getPosts)
	
	// ...
}
```
> 🔥 처음 빌드시 가져온 데이터만 매핑하거나 동적라우팅페이지를 정적파일로 매핑하는법도 존재합니다. </br>
> `getStaticProps`, `getStaticPaths`에 대해 더 궁금하다면 다음 링크를 이용해주세요. </br>
> [official](https://nextjs.org/docs/basic-features/data-fetching/overview) : 데이터 정적파일 매핑 </br>
> [tanStack](https://tanstack.com/query/v4/docs/guides/ssr) : ReactQuery + ssr
