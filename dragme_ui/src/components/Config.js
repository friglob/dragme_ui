
export const stateInitial = {	"format": 	"4-3",
								"rule": 	"thirds",
								"center": 	"c-c",
};

export const centers = [	{	key: "t-l",
								title: "t l"},
							{	key: "t-c",
								title: "t c"},
							{	key: "t-r",
								title: "t r"},
							{	key: "c-r",
								title: "c r" },
							{	key: "b-r",
								title: "b r"},
							{	key: "b-c",
								title: "b c"},
							{	key: "b-l",
								title: "b l"},
							{	key: "c-l",
								title: "c l"},
							{	key: "c-c",
								title: "c c"},
];

export const formats = 	[	{	key: 	"9-16", 
								title:	"Portrait 16:9",
								ratio:  {from: 0.1, to: 0.7}
							},
							{	key: 	"2-3", 
								title:	"Portrait 3:2",
								ratio:  {from: 0.71, to: 0.8}
							},
							{	key: 	"3-4", 
								title:	"Portrait 4:3",
								ratio:  {from: 0.81, to: 0.9}
							},
							{	key: 	"4-5", 
								title:	"Portrait 5:4",
								ratio:  {from: 0.91, to: 0.98}
							},
							{	key: 	"1-1", 
								title:	"Square 1:1",
								ratio:  {from: 0.99, to: 1.01}
							},
							{	key: 	"5-4",
								title: 	"Landscape 5:4",
								ratio:  {from: 1.02, to: 1.2}
							}, 
							{	key: 	"4-3", 
								title: 	"Landscape 4:3",
								ratio:  {from: 1.21, to: 1.3}
							},
							{	key: 	"3-2",
								title: 	"Landscape 3:2",
								ratio:  {from: 1.31, to: 1.4}
							},
							{	key: 	"16-9",
								title: 	"Landscape 16:9",
								ratio:  {from: 1.41, to: 3}
							}
];

export const rules = 	[	{	key: "thirds", 
								svg: "thirds.svg", 
								title: "Rule of thirds"
							}, 
							{	key: "fourths", 
								svg: "fourths.svg",
								title: 	"Rule of fourths" 
							}, 
							{	key: "sixths", 
								svg: "sixths.svg",
								title: 	"Rule of sixths" 
							}, 
							{	key: "fibonaci", 
								svg: "fibonaci.svg",
								title: "Fibonaci spiral"
							},  
							{	key: "golden",
								svg: "golden.svg", 
								title: 	"Golden ratio"
							}
];

export const orientations = [	{	key: "square", 
									title: "Square"
								}, 
								{	key: "landscape", 
									title: "Landscape"
								}, 
								{	key: "portrait", 
									title: "Portrait"
								}
];


export const localStorageKey = "imgData";