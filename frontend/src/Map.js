import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CsvToHtmlTable } from 'react-csv-to-table';
mapboxgl.accessToken= 'pk.eyJ1Ijoid2VhdGhlcjI3MjAiLCJhIjoiY2wzMTZkdnM5MGFsZjNjcGZnM2NyOHk4bSJ9.ie8HWiiU8CzVSSP5NxPMfA';
const data = [
	{
		"location": "Beas river, Sheung Shui",
		"Name": "Beas River",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.105,22.49333],
	},
	{
		"location": "Central Government Pier, 32 Man Fai Street, Central",
		"Name": "Central Pier",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1558333,22.2888888],
	},
	{
		"location": "Cheung Chau Meteorological Station, Peak Road West, Cheung Chau",
		"Name": "Cheung Chau",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.0266667, 22.2011111],
	},
    {
		"location": "Kwok Man School, 30 Kwok Man Rd, Cheung Chau",
		"Name": "Cheung Chau Beach",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.0291667, 22.21083333],
	},
    {
		"location": "The Clearwater Bay Golf and Country Club, 139 Tai Au Mun Road, Clearwater Bay",
		"Name": "Clear Water Bay",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2997222, 22.26333333],
	},
    {
		"location": "Green Island",
		"Name": "Green Island",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1127778, 22.285],
	},
    {
		"location": "Happy Valley, Hong Kong",
		"Name": "Happy Valley",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.18136111, 22.2705555],
	},
    {
		"location": "Hong Kong International Airport, Lantau Island",
		"Name": "Hong Kong International Airport",
		"state": "MANNED WEATHER STATION",
		"coordinates": [113.9219444, 22.3094444],
	},
    {
		"location": "134A Nathan Road, Tsim Sha Tsui",
		"Name": "Hong Kong Observatory",
		"state": "MANNED WEATHER STATION",
		"coordinates": [114.1741667, 22.30194444],
	},
    {
		"location": "19 Cotton Tree Drive, Central, Hong Kong",
		"Name": "Hong Kong Park",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.162222, 22.2783333],
	},
    {
		"location": "Kai Tak Runway Park",
		"Name": "Kai Tak Runway Park",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2169444, 22.30472222],
	},
    {
		"location": "The Jockey Club Kau Sai Chau Public Golf Course",
		"Name": "Kau Sai Chau",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.3125, 22.37027778],
	},
    {
		"location": "22 King's Park Rise Homantin",
		"Name": "King's Park",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1727778, 22.31194444],
	},
    {
		"location": "Lok Fu Service Reservoir Rest Garden, Fu On Street, Kowloon Tsai",
		"Name": "Kowloon City",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1847222, 22.335],
	},
    {
		"location": "Radio Monitoring Unit, OFTA, Ngau Tau Kok service reservoir, Wo Hong Path, Koon Tong",
		"Name": "Kwun Tong",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2247222, 22.3186111],
	},
    {
		"location": "Yung Shue Wan Ferry Pier",
		"Name": "Lamma Island",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1086111, 22.22611111],
	},
    {
		"location": "Lau Fau Shan Police Station, Lau Fau Shan",
		"Name": "Lau Fau Shan",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [113.9836111, 22.46888889],
	},
    {
		"location": "Ngong Ping, Lantau Island",
		"Name": "Ngong Ping",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [113.9127778, 22.25861111],
	},
    {
		"location": "Pak Tam Chung Lowland Pumping Station, Tsak Yue Wu, Pak Tam Road, Sai Kung",
		"Name": "Pak Tam Chung",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.3230556, 22.40277778],
	},
    {
		"location": "Ping Chau Police Post",
		"Name": "Peng Chau",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.0433333, 22.29111111],
	},
    {
		"location": "Marine Outer Waters District Headquarters & Marine East Division Base, Tui Min Hoi, Sai Kung",
		"Name": "Sai Kung",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2744444, 22.37555556],
	},
    {
		"location": "Sha Chau Island",
		"Name": "Sha Chau",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [113.8911111, 22.34583333],
	},
    {
		"location": "Sha Tin HKJC Racecourse",
		"Name": "Sha Tin",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.21, 22.4025],
	},
    {
		"location": "Lai Chi Kok Park, Mei Foo",
		"Name": "Sham Shui Po",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1369444, 22.33583333],
	},
    {
		"location": "HK Museum of Coastal Defence, 175 Tung Hei Road, Shau Kei Wan",
		"Name": "Shau Kei Wan",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2361111, 22.28166667],
	},
    {
		"location": "Shek Kong Airfield, Shek Kong",
		"Name": "Shek Kong",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.0847222, 22.43611111],
	},
    {
		"location": "Kam Tsin Tsuen, Kam Tsin Road, Sheung Shui",
		"Name": "Sheung Shui",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1111111, 22.50194444],
	},
    {
		"location": "Tung Tau Wan Road, Stanley",
		"Name": "Stanley",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2186111, 22.21416667],
	},
    {
		"location": "Tsim Sha Tsui Star Ferry Pier",
		"Name": "Star Ferry(Kowloon)",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1686111, 22.9305556],
	},
    {
		"location": "Ta Kwu Ling Pig Breeding Centre",
		"Name": "Ta Kwu Ling",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1566667, 22.52861111],
	},
    {
		"location": "Tai Lung Veterinary Laboratory, Lin Tong Mei, Sheung Shui",
		"Name": "Tai Lung",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1175, 22.48472222],
	},
    {
		"location": "Tai Mei Tuk Police Adventure Training School",
		"Name": "Tai Mei Tuk",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2375, 22.47527778],
	},
    {
		"location": "Tai Mo Shan Meteorological Station",
		"Name": "Tai Mo Shan",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1244444,22.41055556],
	},
    {
		"location": "Island House Conservation Studies Centre, Island House Lane, Tai Po",
		"Name": "Tai Po",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1788889,22.4611111],
	},
    {
		"location": "Tai Po Railway Pier",
		"Name": "Tai Po Kau",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1841667,22.4425],
	},
    {
		"location": "Tap Mun",
		"Name": "Tap Mun",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.36055556,22.47138889],
	},
    {
		"location": "Tate's Cairn Meteorological Station",
		"Name": "Tate's Cairn",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2177778,22.35777778],
	},
    {
		"location": "Peak Police Station, 92 Peak Road, The Peak",
		"Name": "The Peak",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.155,22.26416667],
	},
    {
		"location": "Haven of Hope Hospital, Tseung Kwan O",
		"Name": "Tseung Kwan O",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2555556,22.31583333],
	},
    {
		"location": "Tsing Yi Sewage Treatment Plant",
		"Name": "Tsing Yi",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.11,22.34416667],
	},
    {
		"location": "Ho Koon Nature Education cum Astronomical Centre, 101 Route Twisk, Tsuen Wan",
		"Name": "Tsuen Wan Ho Koon",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1077778,22.38361111],
	},
    {
		"location": "Shing Mun Valley Park, Tsuen Wan",
		"Name": "Tsuen Wan Shing Mun Valley",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1266667,22.37555556],
	},
    {
		"location": "3 San Shek Wan North Road, Tuen Mun Children and Juvenile Home, Tuen Mun",
		"Name": "Tuen Mun",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [113.9641667,22.38583333],
	},
    {
		"location": "Waglan Island",
		"Name": "Waglan Island",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.3033333,22.18222222],
	},
    {
		"location": "Hong Kong Wetland Park, Wetland Park Road, Tin Shui Wai",
		"Name": "Wetland Park",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.0088889,22.466666667],
	},
    {
		"location": "Hong Kong Police College, 18 Ocean Park Road, Wong Chuk Hang",
		"Name": "Wong Chuk Hang",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.1736111,22.247777778],
	},
    {
		"location": "Nan Lian Garden, Chi Lin Nunnery",
		"Name": "Wong Tai Sin",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.2052778,22.33944444],
	},
    {
		"location": "Town Park Road South, Yuen Long",
		"Name": "Yuen Long Park",
		"state": "AUTOMATIC WEATHER STATION",
		"coordinates": [114.0183333,22.44083333],
	},
] 
const tableData =`
GMID    Dataset    Facility Name    Address    Types of Weather Station    LATITUDE(N)    LONGITUDE(E)    Elevation of ground above mean sea-level (metres)
tVIo5ceAgn    Network of Weather Stations in Hong Kong    Central Pier    Central Government Pier, 32 Man Fai Street, Central    AUTOMATIC WEATHER STATION    "22°17'20"""    "114°09'21"""    19
4SMNscKMRT    Network of Weather Stations in Hong Kong    Cheung Chau    Cheung Chau Meteorological Station, Peak Road West, Cheung Chau    AUTOMATIC WEATHER STATION    "22°12'04"""    "114°01'36"""    72
zWf5Bq1d3X    Network of Weather Stations in Hong Kong    Clear Water Bay    The Clearwater Bay Golf and Country Club, 139 Tai Au Mun Road, Clearwater Bay    AUTOMATIC WEATHER STATION    "22°15'48"""    "114°17'59"""    66
1fKuiAVff5    Network of Weather Stations in Hong Kong    Happy Valley    Happy Valley, Hong Kong    AUTOMATIC WEATHER STATION    "22°16'14"""    "114°11'01"""    5
HUoG8p1CqQ    Network of Weather Stations in Hong Kong    Green Island    Green Island    AUTOMATIC WEATHER STATION    "22°17'06"""    "114°06'46"""    88
WqUvk3BU7L    Network of Weather Stations in Hong Kong    Cheung Chau Beach    Kwok Man School, 30 Kwok Man Rd, Cheung Chau    AUTOMATIC WEATHER STATION    "22°12'39"""    "114°01'45"""    27
D6uhT1LpQr    Network of Weather Stations in Hong Kong    Hong Kong International Airport    Hong Kong International Airport, Lantau Island    MANNED WEATHER STATION    "22°18'34"""     "113°55'19"""    6
oPkhYEoXXg    Network of Weather Stations in Hong Kong    Hong Kong Park    19 Cotton Tree Drive, Central, Hong Kong    AUTOMATIC WEATHER STATION    "22°16'42"""     "114°09'44"""    26
9kGjNsok72    Network of Weather Stations in Hong Kong    Hong Kong Observatory    134A Nathan Road, Tsim Sha Tsui    MANNED WEATHER STATION    "22°18'07"""    "114°10'27"""    32
YvyO2bLyTc    Network of Weather Stations in Hong Kong    Kai Tak     Old Fire Station, Kai Tak Runway    AUTOMATIC WEATHER STATION    "22°18'35"""    "114°12'48"""    3
djTeVUCaJQ    Network of Weather Stations in Hong Kong    Kai Tak Runway Park    Kai Tak Runway Park    AUTOMATIC WEATHER STATION    "22°18'17"""     "114°13'01"""    4
Fnqwkf3Slu    Network of Weather Stations in Hong Kong    Kau Sai Chau    The Jockey Club Kau Sai Chau Public Golf Course    AUTOMATIC WEATHER STATION    "22°22'13"""    "114°18'45"""    39
SRN9paxGVU    Network of Weather Stations in Hong Kong    Kowloon City     Lok Fu Service Reservoir Rest Garden, Fu On Street, Kowloon Tsai     AUTOMATIC WEATHER STATION    "22°20'06"""    "114°11'05"""    92
WDpLfiiIR6    Network of Weather Stations in Hong Kong    King's Park     22 King's Park Rise Homantin     AUTOMATIC WEATHER STATION    "22°18'43"""    "114°10'22"""    65
ga8XIzLR3i    Network of Weather Stations in Hong Kong    Lamma Island    Yung Shue Wan Ferry Pier     AUTOMATIC WEATHER STATION    "22°13'34"""    "114°06'31"""    7
OEoKd8iymv    Network of Weather Stations in Hong Kong    Pak Tam Chung     Pak Tam Chung Lowland Pumping Station, Tsak Yue Wu, Pak Tam Road, Sai Kung    AUTOMATIC WEATHER STATION    "22°24'10"""    "114°19'23"""    5
TEEJMZu0Ax    Network of Weather Stations in Hong Kong    Lau Fau Shan    Lau Fau Shan Police Station, Lau Fau Shan    AUTOMATIC WEATHER STATION     "22°28'08"""    "113°59'01"""    31
KyPY8l2q72    Network of Weather Stations in Hong Kong    Peng Chau    Ping Chau Police Post    AUTOMATIC WEATHER STATION    "22°17'28"""    "114°02'36"""    34
f0jAjlDG2p    Network of Weather Stations in Hong Kong    Sha Tin    Sha Tin HKJC Racecourse    AUTOMATIC WEATHER STATION    "22°24'09"""    "114°12'36"""    6
j0svPYRo9N    Network of Weather Stations in Hong Kong    Sham Shui Po    Lai Chi Kok Park, Mei Foo     AUTOMATIC WEATHER STATION    "22°20'09"""    "114°08'13"""    11
lBK2jY0pmr    Network of Weather Stations in Hong Kong    Sheung Shui     Kam Tsin Tsuen, Kam Tsin Road, Sheung Shui    AUTOMATIC WEATHER STATION    "22°30'07"""    "114°06'40"""    10
4wR8548uUd    Network of Weather Stations in Hong Kong    Shek Kong    Shek Kong Airfield, Shek Kong     AUTOMATIC WEATHER STATION    "22°26'10"""    "114°05'05"""    16
86Lpj91APa    Network of Weather Stations in Hong Kong    Ta Kwu Ling    Ta Kwu Ling Pig Breeding Centre    AUTOMATIC WEATHER STATION    "22°31'43"""    "114°09'24"""    15
TccW6Eofy7    Network of Weather Stations in Hong Kong    Stanley    Tung Tau Wan Road, Stanley    AUTOMATIC WEATHER STATION    "22°12'51"""    "114°13'07"""    31
1cVfbxvVkm    Network of Weather Stations in Hong Kong    Star Ferry(Kowloon)    Tsim Sha Tsui Star Ferry Pier    AUTOMATIC WEATHER STATION    "22°17'35"""    "114°10'07"""    18
2g7WNPWTNu    Network of Weather Stations in Hong Kong    Tai Lung    Tai Lung Veterinary Laboratory, Lin Tong Mei, Sheung Shui    AUTOMATIC WEATHER STATION    "22°29'05"""    "114°07'03"""    21
nymOgN0Vz2    Network of Weather Stations in Hong Kong    Tai Mei Tuk    Tai Mei Tuk Police Adventure Training School    AUTOMATIC WEATHER STATION    "22°28'31"""    "114°14'15"""    51
1SUomwQM57    Network of Weather Stations in Hong Kong    Tai Mo Shan    Tai Mo Shan Meteorological Station    AUTOMATIC WEATHER STATION    "22°24'38"""    "114°07'28"""    955
MBgPFJMjei    Network of Weather Stations in Hong Kong    Tai Po    Island House Conservation Studies Centre, Island House Lane, Tai Po    AUTOMATIC WEATHER STATION    "22°26'46"""     "114°10'44"""     15
EMe4FsUyqR    Network of Weather Stations in Hong Kong    Tai Po Kau     Tai Po Railway Pier    AUTOMATIC WEATHER STATION     "22°26'33"""     "114°11'03"""    11
GuR0YBq39N    Network of Weather Stations in Hong Kong    Tate's Cairn    Tate's Cairn Meteorological Station     AUTOMATIC WEATHER STATION    "22°21'28"""    "114°13'04"""    572
TRP0XfI6N4    Network of Weather Stations in Hong Kong    Tseung Kwan O    Haven of Hope Hospital, Tseung Kwan O    AUTOMATIC WEATHER STATION    "22°18'57"""    "114°15'20"""    38
TaGtcXj6vO    Network of Weather Stations in Hong Kong    Tuen Mun    3 San Shek Wan North Road, Tuen Mun Children and Juvenile Home, Tuen Mun     AUTOMATIC WEATHER STATION     "22°23'09"""     "113°57'51"""    28
UuHMavoudq    Network of Weather Stations in Hong Kong    Tsing Yi     Tsing Yi Sewage Treatment Plant    AUTOMATIC WEATHER STATION    "22°20'39"""     "114°06'36"""     8
GF07HoFSOf    Network of Weather Stations in Hong Kong    Tsuen Wan Shing Mun Valley    Shing Mun Valley Park, Tsuen Wan    AUTOMATIC WEATHER STATION    "22°22'32"""    "114°07'36"""    35
dPrflGxcK8    Network of Weather Stations in Hong Kong    Wetland Park     Hong Kong Wetland Park, Wetland Park Road, Tin Shui Wai    AUTOMATIC WEATHER STATION    "22°28'00"""    "114°00'32"""    4
HONlLslznW    Network of Weather Stations in Hong Kong    Yuen Long Park     Town Park Road South, Yuen Long     AUTOMATIC WEATHER STATION    "22°26'27"""    "114°01'06"""    8
vDXHPLaU9J    Network of Weather Stations in Hong Kong    Wong Tai Sin    Nan Lian Garden, Chi Lin Nunnery     AUTOMATIC WEATHER STATION    "22°20'22"""    "114°12'19"""    21
vu1z9iYqWP    Network of Weather Stations in Hong Kong    Wong Chuk Hang    Hong Kong Police College, 18 Ocean Park Road, Wong Chuk Hang     AUTOMATIC WEATHER STATION    "22°14'52"""    "114°10'25"""    5
tvswAaLvkv    Network of Weather Stations in Hong Kong    Waglan Island     Waglan Island     AUTOMATIC WEATHER STATION    "22°10'56"""    "114°18'12"""    56
SwPnagtdvJ    Network of Weather Stations in Hong Kong    Tsuen Wan Ho Koon     Ho Koon Nature Education cum Astronomical Centre, 101 Route Twisk, Tsuen Wan    AUTOMATIC WEATHER STATION    "22°23'01"""    "114°06'28"""    142
TawaWTRqxm    Network of Weather Stations in Hong Kong    Tap Mun     Tap Mun    AUTOMATIC WEATHER STATION    "22°28'17"""    "114°21'38"""    15
JUeCDi0Rdy    Network of Weather Stations in Hong Kong    The Peak     Peak Police Station, 92 Peak Road, The Peak    AUTOMATIC WEATHER STATION    "22°15'51"""    "114°09'18"""    406
rh6wD8BfC2    Network of Weather Stations in Hong Kong    Shau Kei Wan    HK Museum of Coastal Defence, 175 Tung Hei Road, Shau Kei Wan    AUTOMATIC WEATHER STATION    "22°16'54"""    "114°14'10"""    53
AXtSj6HOhe    Network of Weather Stations in Hong Kong    Sai Kung    Marine Outer Waters District Headquarters & Marine East Division Base, Tui Min Hoi, Sai Kung    AUTOMATIC WEATHER STATION    "22°22'32"""    "114°16'28"""    4
ycRJM4NESj    Network of Weather Stations in Hong Kong    Sha Chau    Sha Chau Island    AUTOMATIC WEATHER STATION    "22°20'45"""    "113°53'28"""    31
5uCRvaUua4    Network of Weather Stations in Hong Kong    Ngong Ping     Ngong Ping, Lantau Island    AUTOMATIC WEATHER STATION    "22°15'31"""    "113°54'46"""    593
UT9oi5A8iT    Network of Weather Stations in Hong Kong    Kwun Tong    Radio Monitoring Unit, OFTA, Ngau Tau Kok service reservoir, Wo Hong Path, Koon Tong    AUTOMATIC WEATHER STATION    "22°19'07"""    "114°13'29"""    90
Web7wVAzF2    Network of Weather Stations in Hong Kong    Beas River     Beas river, Sheung Shui    AUTOMATIC WEATHER STATION    "22°29'36"""    "114°06'18"""    11

`
class Mapp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lng:114.1743,
            lat:22.3020,
            zoom:11
        }
    }
    componentDidMount(){
        const map =new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11', //default
            center:[this.state.lng,this.state.lat],
            zoom:this.state.zoom
        })
        data.forEach((location) => {
			const marker = new mapboxgl.Marker()
							.setLngLat(location.coordinates)
							.setPopup(new mapboxgl.Popup({ offset: 30 })
							.setHTML('<h4>' + location.Name + '</h4>' + location.location))
							.addTo(map);

		})
        
    }
	
    render(){
        return(
				<div>
					<div ref={el=>this.mapContainer =el} style={{width:'100%', height:'100vh'}}/>
					<h5 className="text-center">Network of Weather Stations in Hong Kong</h5>
					<CsvToHtmlTable data={tableData} csvDelimiter="    " tableClassName="table table-striped table-hover"/>
				</div>
                
        )
    }
}
export default Mapp;
