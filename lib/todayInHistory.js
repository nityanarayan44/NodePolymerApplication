/*
@Author: Ashutosh Mishra
@Sate: 23 May 2017, 17:21
@Desc: Node api backend logic
*/
//Global namespace
var todayInHistory = {};

//Adding functions to object
todayInHistory.getHistory = function (req, res, next) {
    var data = [ 
				{"today":
						["Today in History June 6", "1523		Gustav Vasa becomes king of Sweden.", "1641		Spain loses Portugal.", "1674		Sivaji crowns himself King of India.", "1813		The United States invasion of Canada is halted at Stony Creek, Ontario.", "1862		The city of Memphis surrenders to the Union navy after an intense naval engagement on the Mississippi River.", "1865		Confederate raider William Quantrill dies from a wound received while escaping a Union patrol near Taylorsville, Kentucky.", "1918		U.S. Marines enter combat at the Battle of Belleau Wood.", "1924		The German Reichstag accepts the Dawes Plan, an American plan to help Germany pay off its war debts.", "1930		Frozen foods are sold commercially for the first time.", "1934		President Franklin Roosevelt signs the Securities Exchange Act, establishing the Securities and Exchange Commission.", "1941		The U.S. government authorizes the seizure of foreign ships in U.S. ports.", "1944		D-Day: Operation Overlord lands 400,000 Allied American, British, and Canadian troops on the beaches of Normandy in German-occupied France.", "1961		Swiss psychiatrist Carl Gustav Jung, one of the founders of modern psychiatry, dies.", "1966		African American James Meredith is shot and wounded while on a solo march in Mississippi to promote voter registration among blacks.", "1982		Israel invades southern Lebanon.", "1985		The body of Nazi war criminal Dr. Josef Mengele is located and exhumed near Sao Paolo, Brazil.", "Born on June 6", "1606		Pierre Corneille, French author.", "1755		Nathan Hale, American revolutionary.", "1756		John Trumbull, American painter.", "1799		Alexander Pushkin, Russian writer (Boris Godunov, The Queen of Spades).", "1868		Robert F. Scott, British explorer.", "1872		Alexandra, the last Russian Czarina.", "1875		Thomas Mann, German novelist and essayist, forced into exile by the Nazis.", "1902		Jimmie Lunceford, bandleader.", "1907		Bill Dickey, professional baseball player.", "1925		Maxine Kumin, poet novelist and children's author.", "1934		Bill Moyers, American broadcast journalist, press secretary to President Lyndon Johnson.", "1939		Marian Wright Edelman, first African-American woman to be admitted to the Mississippi Bar, founder of the Children's Defense Fund.", ]}
	];
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
};

//Exporting these functions globally
module.exports = todayInHistory;
