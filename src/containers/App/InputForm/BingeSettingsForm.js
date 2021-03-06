import React from 'react';
import { Card, Form, Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { Multiselect } from 'multiselect-react-dropdown';
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import { TiCancel } from 'react-icons/ti'

const ageRatings = [
    { name: '7+', id: '7+' },
    { name: '13+', id: '13+' },
    { name: '16+', id: '16+' },
    { name: '18+', id: '18+' },
    { name: 'all', id: 'all' },
]

const countries = [{ name: "Afghanistan", id: "Afghanistan" },  { name: "Albania", id: "Albania" },  { name: "Algeria", id: "Algeria" },  { name: "Angola", id: "Angola" },  { name: "Argentina", id: "Argentina" },  { name: "Armenia", id: "Armenia" },  { name: "Aruba", id: "Aruba" },  { name: "Australia", id: "Australia" },  { name: "Austria", id: "Austria" },  { name: "Azerbaijan", id: "Azerbaijan" },  { name: "Bahamas", id: "Bahamas" },  { name: "Bahrain", id: "Bahrain" },  { name: "Bangladesh", id: "Bangladesh" },  { name: "Belarus", id: "Belarus" },  { name: "Belgium", id: "Belgium" },  { name: "Bermuda", id: "Bermuda" },  { name: "Bolivia", id: "Bolivia" },  { name: "Bosnia and Herzegovina", id: "Bosnia and Herzegovina" },  { name: "Botswana", id: "Botswana" },  { name: "Brazil", id: "Brazil" },  { name: "Bulgaria", id: "Bulgaria" },  { name: "Burkina Faso", id: "Burkina Faso" },  { name: "Cambodia", id: "Cambodia" },  { name: "Cameroon", id: "Cameroon" },  { name: "Canada", id: "Canada" },  { name: "Cayman Islands", id: "Cayman Islands" },  { name: "Chad", id: "Chad" },  { name: "Chile", id: "Chile" },  { name: "China", id: "China" },  { name: "Colombia", id: "Colombia" },  { name: "Congo", id: "Congo" },  { name: "Costa Rica", id: "Costa Rica" },  { name: "Croatia", id: "Croatia" },  { name: "Cuba", id: "Cuba" },  { name: "Cyprus", id: "Cyprus" },  { name: "Czech Republic", id: "Czech Republic" },  { name: "Czechoslovakia", id: "Czechoslovakia" },  { name: "Côte d'Ivoire", id: "Côte d'Ivoire" },  { name: "Denmark", id: "Denmark" },  { name: "Djibouti", id: "Djibouti" },  { name: "Dominican Republic", id: "Dominican Republic" },  { name: "East Germany", id: "East Germany" },  { name: "Ecuador", id: "Ecuador" },  { name: "Egypt", id: "Egypt" },  { name: "El Salvador", id: "El Salvador" },  { name: "Equatorial Guinea", id: "Equatorial Guinea" },  { name: "Estonia", id: "Estonia" },  { name: "Ethiopia", id: "Ethiopia" },  { name: "Federal Republic of Yugoslavia", id: "Federal Republic of Yugoslavia" },  { name: "Finland", id: "Finland" },  { name: "France", id: "France" },  { name: "Georgia", id: "Georgia" },  { name: "Germany", id: "Germany" },  { name: "Ghana", id: "Ghana" },  { name: "Greece", id: "Greece" },  { name: "Guam", id: "Guam" },  { name: "Guatemala", id: "Guatemala" },  { name: "Haiti", id: "Haiti" },  { name: "Holy See (Vatican City State)", id: "Holy See (Vatican City State)" },  { name: "Honduras", id: "Honduras" },  { name: "Hong Kong", id: "Hong Kong" },  { name: "Hungary", id: "Hungary" },  { name: "Iceland", id: "Iceland" },  { name: "India", id: "India" },  { name: "Indonesia", id: "Indonesia" },  { name: "Iran", id: "Iran" },  { name: "Iraq", id: "Iraq" },  { name: "Ireland", id: "Ireland" },  { name: "Isle Of Man", id: "Isle Of Man" },  { name: "Israel", id: "Israel" },  { name: "Italy", id: "Italy" },  { name: "Jamaica", id: "Jamaica" },  { name: "Japan", id: "Japan" },  { name: "Jordan", id: "Jordan" },  { name: "Kazakhstan", id: "Kazakhstan" },  { name: "Kenya", id: "Kenya" },  { name: "Korea", id: "Korea" },  { name: "Kosovo", id: "Kosovo" },  { name: "Kuwait", id: "Kuwait" },  { name: "Kyrgyzstan", id: "Kyrgyzstan" },  { name: "Laos", id: "Laos" },  { name: "Latvia", id: "Latvia" },  { name: "Lebanon", id: "Lebanon" },  { name: "Liberia", id: "Liberia" },  { name: "Libya", id: "Libya" },  { name: "Liechtenstein", id: "Liechtenstein" },  { name: "Lithuania", id: "Lithuania" },  { name: "Luxembourg", id: "Luxembourg" },  { name: "Malawi", id: "Malawi" },  { name: "Malaysia", id: "Malaysia" },  { name: "Mali", id: "Mali" },  { name: "Malta", id: "Malta" },  { name: "Mexico", id: "Mexico" },  { name: "Moldova", id: "Moldova" },  { name: "Monaco", id: "Monaco" },  { name: "Mongolia", id: "Mongolia" },  { name: "Montenegro", id: "Montenegro" },  { name: "Morocco", id: "Morocco" },  { name: "Mozambique", id: "Mozambique" },  { name: "Namibia", id: "Namibia" },  { name: "Nepal", id: "Nepal" },  { name: "Netherlands", id: "Netherlands" },  { name: "New Zealand", id: "New Zealand" },  { name: "Nicaragua", id: "Nicaragua" },  { name: "Nigeria", id: "Nigeria" },  { name: "Norway", id: "Norway" },  { name: "Oman", id: "Oman" },  { name: "Pakistan", id: "Pakistan" },  { name: "Palestine", id: "Palestine" },  { name: "Panama", id: "Panama" },  { name: "Papua New Guinea", id: "Papua New Guinea" },  { name: "Paraguay", id: "Paraguay" },  { name: "Peru", id: "Peru" },  { name: "Philippines", id: "Philippines" },  { name: "Poland", id: "Poland" },  { name: "Portugal", id: "Portugal" },  { name: "Puerto Rico", id: "Puerto Rico" },  { name: "Qatar", id: "Qatar" },  { name: "Republic of North Macedonia", id: "Republic of North Macedonia" },  { name: "Romania", id: "Romania" },  { name: "Russia", id: "Russia" },  { name: "Rwanda", id: "Rwanda" },  { name: "Saudi Arabia", id: "Saudi Arabia" },  { name: "Senegal", id: "Senegal" },  { name: "Serbia", id: "Serbia" },  { name: "Serbia and Montenegro", id: "Serbia and Montenegro" },  { name: "Singapore", id: "Singapore" },  { name: "Slovakia", id: "Slovakia" },  { name: "Slovenia", id: "Slovenia" },  { name: "Somalia", id: "Somalia" },  { name: "South Africa", id: "South Africa" },  { name: "South Korea", id: "South Korea" },  { name: "Soviet Union", id: "Soviet Union" },  { name: "Spain", id: "Spain" },  { name: "Sri Lanka", id: "Sri Lanka" },  { name: "Sudan", id: "Sudan" },  { name: "Swaziland", id: "Swaziland" },  { name: "Sweden", id: "Sweden" },  { name: "Switzerland", id: "Switzerland" },  { name: "Syria", id: "Syria" },  { name: "Taiwan", id: "Taiwan" },  { name: "Tajikistan", id: "Tajikistan" },  { name: "Tanzania", id: "Tanzania" },  { name: "Thailand", id: "Thailand" },  { name: "The Democratic Republic Of Congo", id: "The Democratic Republic Of Congo" },  { name: "Tonga", id: "Tonga" },  { name: "Trinidad and Tobago", id: "Trinidad and Tobago" },  { name: "Tunisia", id: "Tunisia" },  { name: "Turkey", id: "Turkey" },  { name: "U.S. Virgin Islands", id: "U.S. Virgin Islands" },  { name: "Uganda", id: "Uganda" },  { name: "Ukraine", id: "Ukraine" },  { name: "United Arab Emirates", id: "United Arab Emirates" },  { name: "United Kingdom", id: "United Kingdom" },  { name: "United States", id: "United States" },  { name: "Uruguay", id: "Uruguay" },  { name: "Venezuela", id: "Venezuela" },  { name: "Vietnam", id: "Vietnam" },  { name: "West Germany", id: "West Germany" },  { name: "Yemen", id: "Yemen" },  { name: "Yugoslavia", id: "Yugoslavia" },  { name: "Zambia", id: "Zambia" },  { name: "Zimbabwe", id: "Zimbabwe" }]
const languages = [{ name: " Ancient (to 1453)", id: " Ancient (to 1453)" },  { name: "Aboriginal", id: "Aboriginal" },  { name: "Afrikaans", id: "Afrikaans" },  { name: "Akan", id: "Akan" },  { name: "Albanian", id: "Albanian" },  { name: "Algonquin", id: "Algonquin" },  { name: "American Sign Language", id: "American Sign Language" },  { name: "Amharic", id: "Amharic" },  { name: "Apache languages", id: "Apache languages" },  { name: "Arabic", id: "Arabic" },  { name: "Aragonese", id: "Aragonese" },  { name: "Aramaic", id: "Aramaic" },  { name: "Armenian", id: "Armenian" },  { name: "Assamese", id: "Assamese" },  { name: "Assyrian Neo-Aramaic", id: "Assyrian Neo-Aramaic" },  { name: "Athapascan languages", id: "Athapascan languages" },  { name: "Australian Sign Language", id: "Australian Sign Language" },  { name: "Awadhi", id: "Awadhi" },  { name: "Azerbaijani", id: "Azerbaijani" },  { name: "Basque", id: "Basque" },  { name: "Belarusian", id: "Belarusian" },  { name: "Bemba", id: "Bemba" },  { name: "Bengali", id: "Bengali" },  { name: "Berber languages", id: "Berber languages" },  { name: "Bhojpuri", id: "Bhojpuri" },  { name: "Bosnian", id: "Bosnian" },  { name: "Brazilian Sign Language", id: "Brazilian Sign Language" },  { name: "British Sign Language", id: "British Sign Language" },  { name: "Bulgarian", id: "Bulgarian" },  { name: "Cantonese", id: "Cantonese" },  { name: "Catalan", id: "Catalan" },  { name: "Chechen", id: "Chechen" },  { name: "Cheyenne", id: "Cheyenne" },  { name: "Chinese", id: "Chinese" },  { name: "Cornish", id: "Cornish" },  { name: "Creek", id: "Creek" },  { name: "Croatian", id: "Croatian" },  { name: "Czech", id: "Czech" },  { name: "Danish", id: "Danish" },  { name: "Dari", id: "Dari" },  { name: "Dutch", id: "Dutch" },  { name: "Dyula", id: "Dyula" },  { name: "East-Greenlandic", id: "East-Greenlandic" },  { name: "English", id: "English" },  { name: "Esperanto", id: "Esperanto" },  { name: "Estonian", id: "Estonian" },  { name: "Ewe", id: "Ewe" },  { name: "Filipino", id: "Filipino" },  { name: "Finnish", id: "Finnish" },  { name: "Flemish", id: "Flemish" },  { name: "French", id: "French" },  { name: "French Sign Language", id: "French Sign Language" },  { name: "Fulah", id: "Fulah" },  { name: "Gallegan", id: "Gallegan" },  { name: "Georgian", id: "Georgian" },  { name: "German", id: "German" },  { name: "Greek", id: "Greek" },  { name: "Greenlandic", id: "Greenlandic" },  { name: "Guarani", id: "Guarani" },  { name: "Gujarati", id: "Gujarati" },  { name: "Haitian", id: "Haitian" },  { name: "Hakka", id: "Hakka" },  { name: "Haryanvi", id: "Haryanvi" },  { name: "Hausa", id: "Hausa" },  { name: "Hawaiian", id: "Hawaiian" },  { name: "Hebrew", id: "Hebrew" },  { name: "Hindi", id: "Hindi" },  { name: "Hungarian", id: "Hungarian" },  { name: "Ibo", id: "Ibo" },  { name: "Icelandic", id: "Icelandic" },  { name: "Indonesian", id: "Indonesian" },  { name: "Inuktitut", id: "Inuktitut" },  { name: "Irish", id: "Irish" },  { name: "Italian", id: "Italian" },  { name: "Japanese", id: "Japanese" },  { name: "Japanese Sign Language", id: "Japanese Sign Language" },  { name: "Kabyle", id: "Kabyle" },  { name: "Kannada", id: "Kannada" },  { name: "Kazakh", id: "Kazakh" },  { name: "Khmer", id: "Khmer" },  { name: "Kinyarwanda", id: "Kinyarwanda" },  { name: "Kirghiz", id: "Kirghiz" },  { name: "Klingon", id: "Klingon" },  { name: "Korean", id: "Korean" },  { name: "Kriolu", id: "Kriolu" },  { name: "Kudmali", id: "Kudmali" },  { name: "Kurdish", id: "Kurdish" },  { name: "Lao", id: "Lao" },  { name: "Latin", id: "Latin" },  { name: "Latvian", id: "Latvian" },  { name: "Lingala", id: "Lingala" },  { name: "Lithuanian", id: "Lithuanian" },  { name: "Low German", id: "Low German" },  { name: "Luxembourgish", id: "Luxembourgish" },  { name: "Macedonian", id: "Macedonian" },  { name: "Malay", id: "Malay" },  { name: "Malayalam", id: "Malayalam" },  { name: "Maltese", id: "Maltese" },  { name: "Mandarin", id: "Mandarin" },  { name: "Manipuri", id: "Manipuri" },  { name: "Maori", id: "Maori" },  { name: "Mapudungun", id: "Mapudungun" },  { name: "Marathi", id: "Marathi" },  { name: "Masai", id: "Masai" },  { name: "Maya", id: "Maya" },  { name: "Micmac", id: "Micmac" },  { name: "Middle English", id: "Middle English" },  { name: "Min Nan", id: "Min Nan" },  { name: "Minangkabau", id: "Minangkabau" },  { name: "Mixtec", id: "Mixtec" },  { name: "Mohawk", id: "Mohawk" },  { name: "Mongolian", id: "Mongolian" },  { name: "More", id: "More" },  { name: "Nama", id: "Nama" },  { name: "Navajo", id: "Navajo" },  { name: "Nepali", id: "Nepali" },  { name: "None", id: "None" },  { name: "North American Indian", id: "North American Indian" },  { name: "Norwegian", id: "Norwegian" },  { name: "Nushi", id: "Nushi" },  { name: "Nyanja", id: "Nyanja" },  { name: "Occitan", id: "Occitan" },  { name: "Papiamento", id: "Papiamento" },  { name: "Persian", id: "Persian" },  { name: "Polish", id: "Polish" },  { name: "Polynesian", id: "Polynesian" },  { name: "Portuguese", id: "Portuguese" },  { name: "Punjabi", id: "Punjabi" },  { name: "Pushto", id: "Pushto" },  { name: "Quechua", id: "Quechua" },  { name: "Rajasthani", id: "Rajasthani" },  { name: "Romanian", id: "Romanian" },  { name: "Romany", id: "Romany" },  { name: "Russian", id: "Russian" },  { name: "Saami", id: "Saami" },  { name: "Sanskrit", id: "Sanskrit" },  { name: "Scots", id: "Scots" },  { name: "Scottish Gaelic", id: "Scottish Gaelic" },  { name: "Serbian", id: "Serbian" },  { name: "Serbo-Croatian", id: "Serbo-Croatian" },  { name: "Shanghainese", id: "Shanghainese" },  { name: "Sicilian", id: "Sicilian" },  { name: "Sign Languages", id: "Sign Languages" },  { name: "Sinhalese", id: "Sinhalese" },  { name: "Sioux", id: "Sioux" },  { name: "Slovak", id: "Slovak" },  { name: "Slovenian", id: "Slovenian" },  { name: "Somali", id: "Somali" },  { name: "Southern Sotho", id: "Southern Sotho" },  { name: "Spanish", id: "Spanish" },  { name: "Spanish Sign Language", id: "Spanish Sign Language" },  { name: "Swahili", id: "Swahili" },  { name: "Swedish", id: "Swedish" },  { name: "Swiss German", id: "Swiss German" },  { name: "Tagalog", id: "Tagalog" },  { name: "Tajik", id: "Tajik" },  { name: "Tamil", id: "Tamil" },  { name: "Tatar", id: "Tatar" },  { name: "Telugu", id: "Telugu" },  { name: "Teochew", id: "Teochew" },  { name: "Thai", id: "Thai" },  { name: "Tibetan", id: "Tibetan" },  { name: "Tupi", id: "Tupi" },  { name: "Turkish", id: "Turkish" },  { name: "Turkmen", id: "Turkmen" },  { name: "Uighur", id: "Uighur" },  { name: "Ukrainian", id: "Ukrainian" },  { name: "Urdu", id: "Urdu" },  { name: "Vietnamese", id: "Vietnamese" },  { name: "Welsh", id: "Welsh" },  { name: "Wolof", id: "Wolof" },  { name: "Xhosa", id: "Xhosa" },  { name: "Yiddish", id: "Yiddish" },  { name: "Yoruba", id: "Yoruba" },  { name: "Zulu", id: "Zulu" }]

export default ({ badMovieBinge, goBack, onBadMovieToggleChange, ageSelections, countrySelections, languageSelections, toggleAgeRating, selectCountryOption, removeCountryOption, selectLanguageOption, removeLanguageOption, errorMessage }) => (
    <div className = "BingeSettingsForm">
        <Button onClick = { goBack } variant = "link">Back</Button>
        <Row className = "bad-movie-binge-section">
            <h2>Bad Movie Binge</h2>
            <div>
                <span>Would you prefer to watch bad movies?</span>
                <OverlayTrigger
                    className = "tooltip"
                    placement = "top"
                    overlay = {
                        <Tooltip>
                            A bad movie binge is when you purposefully watch bad movies.
                        </Tooltip>
                    }
                >
                    <IoIosInformationCircleOutline className = "tip" />
                </OverlayTrigger>
                <BootstrapSwitchButton
                    checked = { badMovieBinge }
                    onlabel = 'Yes'
                    offlabel = 'No'
                    onChange = { onBadMovieToggleChange }
                    onstyle = "success"
                />
            </div>
        </Row>
        <Row className = "age-restriction-row">
            <h2>Age Restrictions</h2>
            <div className = "age-restriction-options">
                { ageRatings.map(rating => (
                    <Card key = { rating.id }>
                        <Card.Body>
                            <Card.Text>
                                <p className = "age-rating-name">{ rating.name }</p>
                                <Button 
                                    block 
                                    variant = { ageSelections.filter(selection => selection === rating.id).length > 0 ? "success" : "danger" }
                                    onClick = { () => toggleAgeRating( rating.id ) } 
                                >{ ageSelections.filter(selection => selection === rating.id).length > 0 ? <FaCheck /> : <TiCancel /> }
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Row>
        <Row>
            <Col>
                <h2>Country</h2>
                <Multiselect
                    options={ countries }
                    selectedValues={ countrySelections } 
                    onSelect={ selectCountryOption }
                    onRemove={ removeCountryOption }
                    displayValue = "name"
                />
            </Col>
            <Col>
                <h2>Language(s)</h2>
                <Multiselect
                    options={ languages }
                    selectedValues={ languageSelections } 
                    onSelect={ selectLanguageOption }
                    onRemove={ removeLanguageOption }
                    displayValue = "name"
                />
            </Col>
        </Row>
        <Form.Text className = "form-error">{ errorMessage }</Form.Text>
        <Button type = "submit">Submit</Button>
    </div>
)