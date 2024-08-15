"use client";
import ProgressDemo from './components/progress' ;

import Image from "next/image";
import ReduxProvider from "./store/redux-provider";
import AuthViewer from "./pages/authclient/page";
import TagTitle from "./components/TagTitle";
import Slideshow from "./components/slideShow";
import MovieItem from "./components/movieItem";
import PaginationDemo from "./components/Pagination";
import { LOCALES } from "./language/type";
import { messages } from "./language/message";

import { useAppSelector } from "./store/store";
import { useAppDispatch } from "./store/store";
import { setLanguae } from "./language/languageSlice";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { auth  } from "./config/Firebase";

export default function Home() {


    const router = useRouter();

    // const dispatch: any = useAppDispatch();
    // const language: any = useAppSelector(
    //     (state) => state.languages.languageState
    // );
    // const locale = LOCALES.ENGLISH;

    // console.log("check ", language);
    // handler get data
    const fetcher = (url: string) => axios.get(url).then((res) => res.data);
    const { data, error, isLoading } = useSWR(
        "https://phimlau-509fd-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        fetcher,
        {
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
        }
    );

    if (error) return "An error has occurred.";
    if (isLoading) return <ProgressDemo />;

    return (
        // vd : ⁡⁣⁣⁢về redux ⁡
        // <ReduxProvider>
        //   <h2>trang cate</h2>
        //   <AuthViewer/>
        // <AuthUpdater/>
        // </ReduxProvider>
        <>
            {/* <ReduxProvider> */}
            {/* <IntlProvider
                messages={messages[language] || locale}
                locale={language || locale}
                defaultLocale={locale}
            > */}
                {/* <button onClick={() => dispatch(setLanguae(LOCALES.JAPANESE))}>
                    chuyen
                </button>
                <h1>
                    <FormattedMessage id="learn_to" />
                </h1> */}
                <TagTitle title={"Phim Đề Cử "} />
                <Slideshow />
                <TagTitle title={"Mới Cập Nhật"} />
                {/* detail sản phẩm */}
                <div className="movieList p-2 mb-3 rounded-xl flex flex-wrap">
                    {data && data.map((e : any) => {
                        return (
                            <div
                                className="w-[20%]"
                                onClick={() => {
                                    router.push(
                                        "/pages/client/detailProduct?id=" + e.id
                                    );
                                }}
                                key={e.id}
                            >
                                <MovieItem data={e} />
                            </div>
                        );
                    })}

                    <PaginationDemo />
                </div>
            {/* </IntlProvider> */}
            {/* </ReduxProvider> */}
        </>
    );
}
