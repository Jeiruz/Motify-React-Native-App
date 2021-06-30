import { Text } from 'react-native'
import React from 'react'

export const renderTimestamp = timestamp => {
    let prefix = ''; 
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000);
    if (timeDiff < 1) { // less than one minute ago
        prefix = 'just now...';
    } else if (timeDiff < 60 && timeDiff > 1) { // less than sixty minutes ago
        prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24*60 && timeDiff > 60) { // less than 24 hours ago
        prefix = `${Math.round(timeDiff/60)} hours ago`;
    } else if (timeDiff < 31*24*60 && timeDiff > 24*60) { // less than 7 days ago
        prefix = `${Math.round(timeDiff/(60*24))} days ago`;
    } else {
        prefix = `${new Date(timestamp)}`;
    }
    return prefix
}

export const HASHTAG_FORMATTER = (text, navigation) => {
    return text.split(/((?:^|\s)(?:#[a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
      if(v.includes('#')) {
        return <Text key={i} onPress={() => navigation.navigate("PostSearch", { tags: v.split("#")[1], category: true })} style={{ fontWeight: "bold" }}>{v}</Text>
      } else {
        return <Text key={i}>{v}</Text>
      }
    })
  }

export const random_style = (number) => {
    if (number === 0) {
        return styles.number0
    } else if (number === 1) {
        return styles.number1
    } else if (number === 2) {
        return styles.number2
    } else if (number === 3) {
        return styles.number3
    } else if (number === 4) {
        return styles.number4
    } else if (number === 5) {
        return styles.number5
    } else if (number === 6) {
        return styles.number6
    } else if (number === 7) {
        return styles.number7
    } else if (number === 8) {
        return styles.number8
    } else if (number === 9) {
        return styles.number9
    } else if (number === 10) {
        return styles.number10
    } else if (number === 11) {
        return styles.number11
    } else if (number === 12) {
        return styles.number12
    } else if (number === 13) {
        return styles.number13
    } else if (number === 14) {
        return styles.number14
    } else if (number === 15) {
        return styles.number15
    } else if (number === 16) {
        return styles.number16
    } else if (number === 17) {
        return styles.number17
    } else if (number === 18) {
        return styles.number18
    } else if (number === 19) {
        return styles.number19
    } else if (number === 20) {
        return styles.number20
    } else if (number === 21) {
        return styles.number21
    } else if (number === 22) {
        return styles.number22
    } else if (number === 23) {
        return styles.number23
    } else if (number === 24) {
        return styles.number24
    } else if (number === 25) {
        return styles.number25
    } else if (number === 26) {
        return styles.number26
    } else if (number === 27) {
        return styles.number27
    } else if (number === 28) {
        return styles.number28
    } else if (number === 29) {
        return styles.number29
    } else if (number === 30) {
        return styles.number30
    } else if (number === 31) {
        return styles.number31
    } else if (number === 32) {
        return styles.number32
    } else if (number === 33) {
        return styles.number33
    } else if (number === 34) {
        return styles.number34
    } else if (number === 35) {
        return styles.number35
    } else if (number === 36) {
        return styles.number36
    } else if (number === 37) {
        return styles.number37
    } else if (number === 38) {
        return styles.number38
    } else if (number === 39) {
        return styles.number39
    } else if (number === 40) {
        return styles.number40
    } else if (number === 41) {
        return styles.number41
    } else if (number === 42) {
        return styles.number42
    } else if (number === 43) {
        return styles.number43
    } else if (number === 44) {
        return styles.number44
    } else if (number === 45) {
        return styles.number45
    } 
}

export const baseURL = "http://127.0.0.1:8000"

const styles = {
    number1: {
        backgroundColor: "#fcf7f6",
        flex: 1,
        color: "#0f0248",
        third_color: "#c5e7ec",
        // backgroundColor: "#e8e7e2",
        // flex: 1,
        // color: "black",
        // third_color: "white",
    },
    number2: {
        backgroundColor: "#ffddc7",
        flex: 1,
        color: "black",
        third_color: "#c4b9bc"
    },
    number3: {  
        backgroundColor: "#f5dadf",
        flex: 1,
        third_color: "#d8cecc",
        color: "#566b78",
    },
    number4: {
        backgroundColor: "black",
        flex: 1,
        color: "white",
        third_color: "#1a1a1a",
    },
    number5: {
        backgroundColor: "#232323",
        flex: 1,
        color: "#acacac",
        third_color: "#3b4d5b",
    },
    number6: {
        backgroundColor: "#cdc3b9",
        flex: 1,
        color: "#675b4f",
        third_color: "#dbd5c9",
    },
    number7: {
        backgroundColor: "#dbd5c9",
        flex: 1,
        color: "black",
        third_color: "#cdc3b9",
    },
    number8: {
        backgroundColor: "#b0c7d5",
        flex: 1,
        color: "black",
        third_color: "white",
    },
    number9: {
        backgroundColor: "#3b4d5b",
        flex: 1,
        color: "white",
        third_color: "#b0c7d5",
    },
    number10: {
        backgroundColor: "black",
        flex: 1,
        color: "pink",
        third_color: "#1a1a1a",
    },
    number0: {
        backgroundColor: "#be88a5",
        flex: 1,
        color: "white",
        third_color: "#a193b6",
    },
    number11: {
        backgroundColor: "#aeb19e",
        flex: 1,
        color: "#2e2a29",
        third_color: "#e7e6e1",
    },
    number12: {
        backgroundColor: "#9ccac0",
        flex: 1,
        color: "#cd3332",
        third_color: "#e7e6e1",
        //change it
    },
    number13: {
        backgroundColor: "#004056",
        flex: 1,
        color: "#e5a88c",
        third_color: "#6b9e9a",
    },
    number14: {
        backgroundColor: "#263339",
        flex: 1,
        color: "#e7b292",
        third_color: "#58656b",
    },
    number15: {
        backgroundColor: "#fcf7f6",
        flex: 1,
        color: "#0f0248",
        third_color: "#c5e7ec",
    },
    number16: {
        backgroundColor: "#fed7d8",
        flex: 1,
        color: "#131313",
        third_color: "#eeeeee",
    },
    number17: {
        // backgroundColor: "#0e413a",
        // flex: 1,
        // color: "#efbeff",
        // third_color: "#e8e7e2",
        backgroundColor: "#232323",
        flex: 1,
        color: "#acacac",
        third_color: "#3b4d5b",
    },
    number18: {
        // backgroundColor: "#553d67",
        // flex: 1,
        // color: "white",
        // third_color: "#99738e",
        backgroundColor: "black",
        flex: 1,
        color: "white",
        third_color: "#1a1a1a",
    },
    number19: {
        backgroundColor: "#bc986a",
        flex: 1,
        color: "#fbeec1",
        third_color: "#daad86",
    }, number20: {
        backgroundColor: "#907163",
        flex: 1,
        color: "white",
        third_color: "#379683",
    }, number21: {
        backgroundColor: "#5d5c61",
        flex: 1,
        color: "#b1a296",
        third_color: "#379683",
    }, number22: {
        backgroundColor: "#557a95",
        flex: 1,
        color: "white",
        third_color: "#7395ae",
    }, number23: {
        backgroundColor: "#64485c",
        flex: 1,
        color: "#adadad",
        third_color: "#83677b",
    }, number24: {
        backgroundColor: "#2e1114",
        flex: 1,
        color: "white",
        third_color: "#501b1d",
    }, number25: {
        backgroundColor: "#7e685a",
        flex: 1,
        color: "#c2cad0",
        third_color: "#c2b9b0",
    }, number26: {
        backgroundColor: "#1f2833",
        flex: 1,
        color: "#c5c6c7",
        third_color: "#0b0c10",
    }, number27: {
        backgroundColor: "#e3afbc",
        flex: 1,
        color: "white",
        third_color: "#9a1750",
    }, number28: {
        backgroundColor: "#edc7b7",
        flex: 1,
        color: "black",
        third_color: "#eee2dc",
    }, number29: {
        backgroundColor: "#d9b08c",
        flex: 1,
        color: "#d1e8e2",
        third_color: "#ffcb9a",
    }, number30: {
        backgroundColor: "#2f4454",
        flex: 1,
        color: "white",
        third_color: "#1c3334",
    }, number31: {
        backgroundColor: "#eae7dc",
        flex: 1,
        color: "#e85a4f",
        third_color: "#d8c3a5",
    }, number32: {
        backgroundColor: "#e98074",
        flex: 1,
        color: "#a4b3b6",
        third_color: "#44318d",
    }, number33: {
        backgroundColor: "#84ceeb",
        flex: 1,
        color: "black",
        third_color: "#c1c8e4",
    }, number34: {
        backgroundColor: "#88bdbc",
        flex: 1,
        color: "#112d32",
        third_color: "#254e58",
    }, number35: {
        backgroundColor: "#6e6658",
        flex: 1,
        color: "#88bdbc",
        third_color: "#4f4a41",
    }, number36: {
        backgroundColor: "#25274d",
        flex: 1,
        color: "#aaabbb",
        third_color: "#464866",
    }, number37: {
        backgroundColor: "#46344e",
        flex: 1,
        color: "#9d8d8f",
        third_color: "#5a5560",
    }, number38: {
        backgroundColor: "#9b786f",
        flex: 1,
        color: "white",
        third_color: "#5a5560",
    }, number39: {
        backgroundColor: "#b39bc8",
        flex: 1,
        color: "a1c3d1",
        third_color: "#f172a1",
    }, number40: {
        backgroundColor: "#a1c3d1",
        flex: 1,
        color: "#f0ebf4",
        third_color: "#b39bc8",
    }, number41: {
        backgroundColor: "#78244c",
        flex: 1,
        color: "white",
        third_color: "#59253a",
    }, number42: {
        backgroundColor: "#9e5a63",
        flex: 1,
        color: "white",
        third_color: "#97aabd",
    }, number43: {
        backgroundColor: "#8e8268",
        flex: 1,
        color: "white",
        third_color: "#474853",
    }, number44: {
        backgroundColor: "#5f6366",
        flex: 1,
        color: "white",
        third_color: "#4d6d9a",
    }, number45: {
        backgroundColor: "#9b786f",
        flex: 1,
        color: "#9d8d8f",
        third_color: "#5a5560",
    }, 
}