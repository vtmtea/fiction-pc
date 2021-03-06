import FontIcons from "../components/FontIcons"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BookState, ChapterState } from "../service/serviceInterface"
import { useEffect, useState } from "react"
import { getBookChapter } from "../service/book"

type ParamsState = {
	bookId: string;
	chapterId: string;
}

const BookRead = () => {
	const { bookId, chapterId } = useParams<ParamsState>()
	const navigate = useNavigate()
	const [bookInfo, setBookInfo] = useState<BookState | null>(null)
	const [chapterInfo, setChapterInfo] = useState<ChapterState | null>(null)

	const goChapter = (toChapterId: string | undefined) => {
		if (!toChapterId) {
			alert("没有啦!")
			return
		}
		navigate(`/${bookId}/read_${toChapterId}`)
	}

	useEffect(() => {
		(async () => {
			const res = await getBookChapter(chapterId as string)
			const {bookInfo, chapterInfo} = res.data
			setBookInfo(bookInfo)
			setChapterInfo(chapterInfo)
			window.scroll(0, 0)
		})()
	}, [chapterId])

	return <>
		<div className="my-6">
			<FontIcons name="house" color="#f55"/>
			<span className="text-[14px] text-[#626267] ml-1">
				<Link title="DuDuDu" to="/" className="mr-1">DuDuDu</Link>
				<FontIcons name="angle-right"/>
				<Link to={`/category/${bookInfo?.category.uuid}`} className="mx-1">{bookInfo?.category.title}</Link>
				<FontIcons name="angle-right"/>
				<Link to={`/${bookId}`} className="mx-1">{bookInfo?.title}</Link>
				<FontIcons name="angle-right"/>
				<Link to="" className="ml-1">{chapterInfo?.title}</Link>
			</span>
		</div>
		<div className="px-14 bg-white">
			<div className="py-14 flex flex-col items-center">
				<h1 className="text-[26px] font-bold mb-5">{bookInfo?.title} {chapterInfo?.title}</h1>
				<div className="flex justify-center">
					<span className="mr-7 text-[#999] text-[14px]">作者：
						<Link to="/author/LingChaShu.html">
							<span className="text-[#626267]">{bookInfo?.author.name}</span>
						</Link>
					</span>
					<span className="mr-7 text-[#999] text-[14px]">分类：
						<Link to={`/category/${bookInfo?.category.uuid}`}>
							<span className="text-[#626267]">{bookInfo?.category.title}</span>
						</Link>
					</span>
					<span className="text-[#999] text-[14px]">更新时间：
						<Link to="">
							<span className="text-[#626267]">{chapterInfo?.created_at}</span>
						</Link>
					</span>
				</div>
			</div>
			<div className="read-content text-[#626267] leading-10 pb-20">
				{chapterInfo?.content.split(/\s+/).map((p, k) => <p key={k}>{p}</p>)}
			</div>
			<div className="pb-6 text-center">
				<button
					className="border border-[#f55] text-[#f55] w-24 h-9 leading-9 text-center mr-5 text-[14px]">加入收藏
				</button>
				<button
					className="border border-[#f55] text-[#f55] w-24 h-9 leading-9 text-center mr-5 text-[14px]" onClick={() => goChapter(chapterInfo?.prev_id)}>上一章
				</button>
				<button
					className="border border-[#f55] text-[#f55] w-24 h-9 leading-9 text-center mr-5 text-[14px]">章节列表
				</button>
				<button
					className="border border-[#f55] text-[#f55] w-24 h-9 leading-9 text-center mr-5 text-[14px]" onClick={() => goChapter(chapterInfo?.next_id)}>下一章
				</button>
				<button
					className="border border-[#f55] text-[#f55] w-24 h-9 leading-9 text-center mr-5 text-[14px]">错误反馈
				</button>
			</div>
		</div>
	</>
}

export default BookRead
