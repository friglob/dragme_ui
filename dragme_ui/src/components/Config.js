
export const baseUrl = 		'https://www.borisvidosevic.com/composition/';

export const stateInitial = {	"format": 		"4-3",
								"rule": 		"r-thirds",
								"center": 		"c-c",
								"orientation": 	""
};

export const centers = [	{	key: "t-l",
								title: "t l"},
							{	key: "t-c",
								title: "t c"},
							{	key: "t-r",
								title: "t r"},
							{	key: "c-l",
								title: "c l"},
							{	key: "c-c",
								title: "c c"},
							{	key: "c-r",
								title: "c r" },
							{	key: "b-l",
								title: "b l"},
							{	key: "b-c",
								title: "b c"},
							{	key: "b-r",
								title: "b r"}
];

export const formats = 	[	{	key: 	"9-16", 
								title:	"Portrait 16:9",
								ratio:  {from: 0.2, to: 0.65}
							},
							{	key: 	"2-3", 
								title:	"Portrait 3:2",
								ratio:  {from: 0.66, to: 0.74}
							},
							{	key: 	"3-4", 
								title:	"Portrait 4:3",
								ratio:  {from: 0.75, to: 0.79}
							},
							{	key: 	"4-5", 
								title:	"Portrait 5:4",
								ratio:  {from: 0.8, to: 0.89}
							},
							{	key: 	"1-1", 
								title:	"Square 1:1",
								ratio:  {from: 0.9, to: 1.24}
							},
							{	key: 	"5-4",
								title: 	"Landscape 5:4",
								ratio:  {from: 1.25, to: 1.32}
							}, 
							{	key: 	"4-3", 
								title: 	"Landscape 4:3",
								ratio:  {from: 1.33, to: 1.49}
							},
							{	key: 	"3-2",
								title: 	"Landscape 3:2",
								ratio:  {from: 1.5, to: 1.75}
							},
							{	key: 	"16-9",
								title: 	"Landscape 16:9",
								ratio:  {from: 1.76, to: 3}
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

export const rules = 	[	{	key: "r-thirds", 
								title: "Rule Of Thirds"
							}, 
							{	key: "p-grid", 
								title: "Phi Grid"
							}, 
							{	key: "symmetry", 
								title: "Symmetry"
							}, 
							{	key: "g-triangles",
								title: 	"Golden Triangles"
							},
							{	key: "g-harmonius",
								title: 	"Harmonius Triangles"
							},
							{	key: "g-spiral",
								title: 	"Golden Spiral"
							}
];

export const localStorageKey = "imgData";