import { BoxSeam, RecycleIcon, LocationIcon } from "@/components/icons";

const highlightItems = [
	{
		icon: <BoxSeam width={78} color="#000" />,
		title: "Complimentary Shipping",
		description: "Enjoy free shipping on U.S. orders over $100.",
	},
	{
		icon: <RecycleIcon width={78} color="#000" />,
		title: "Consciously Crafted",
		description: "Designed with you and the planet in mind",
	},
	{
		icon: <LocationIcon width={78} color="#000" />,
		title: "Come Say Hi",
		description: "We have 11 stores across the U.S.",
	},
];

const HighlightService = () => {
	return (
		<section className="my-3 py-5 bg-white">
			<div className="container mx-auto text-center d-flex align-items-center justify-content-between">
				{highlightItems.map((item, idx) => (
					<div key={idx} className="flex flex-col items-center">
						<div className="mb-4">{item.icon}</div>
						<h3 className="fs-6 fw-normal text-lg">{item.title}</h3>
						<p className="text-gray-600 text-sm fw-light">{item.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default HighlightService;
