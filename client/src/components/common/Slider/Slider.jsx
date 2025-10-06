import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const Slider = ({ items, renderItem, slidesPerView = 4, ...rest }) => {
	return (
		<Swiper
			modules={[Navigation, Pagination]}
			spaceBetween={16}
			slidesPerView={slidesPerView}
			navigation
			pagination={{ clickable: true }}
			{...rest}
		>
			{items.map((item, idx) => (
				<SwiperSlide key={idx}>
					{renderItem(item)}
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default Slider