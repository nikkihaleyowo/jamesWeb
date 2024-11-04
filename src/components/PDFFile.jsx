import React, { useEffect, useState } from 'react'
import {Page, Text, Image, Document, StyleSheet, View, usePDF} from '@react-pdf/renderer'



import WebbSecuredImg from "../images/WebbSecured.png"
//import { text } from 'framer-motion/client';

import { convertToRoman } from '../utils/utils';
import { usePDFContext } from '../Context/PDFContext';

import { formatLocation } from '../utils/utils'

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row', // Set the layout to row
      justifyContent: 'space-between', // Adjust spacing between elements (adjust as needed)
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
    },
    front: {
        fontSize: 24,
        textAlign:"center",
        top:120
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        
    },
    tableTitle: {
      fontSize: 20,
      textAlign:"center",
      marginBottom: 10,
      marginTop:24,
      textDecoration: "underline"
    },
    tableText: {
        fontSize: 14,
        fontFamily: "Times-Roman",
        marginBottom: 8,
        paddingHorizontal: 35,
    },
    li: {
        margin: 12,
        fontSize: 14,
        left:20,
        textAlign: "justify",
        fontFamily: "Times-Roman",
        
    },
    listItem: {
      flexDirection: 'row',
      
      marginBottom: 5,
    },
    bullet: {
      marginleft: 5,
      marginTop: 10,
    },
    image: {
        marginVertical: 20,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 30,
        textAlign: 'right',
        color: "grey",
    },
    footer: {
        position: "absolute",
        fontSize: 12,
        bottom: 10,
        left: 30,
        right: 0,
        color: "grey",
        borderTop: '1px solid black', // Adjust border width, color, and style as needed
        width: '100%',
    },
});
const PDFFile = (props) => {
  

  const [tableOfContents,setTableOfContents] = useState([]);
  let lastInput = ""

  const [loaded,setLoaded] = useState(false)
  const [updatedTable,setUpdatedTable] = useState([])

  const tmpTableOfContents = [];
  let load = false;


  function addTableOfContents(section, isLast){


    const index = tableOfContents.findIndex(item => item.title === section.title);
    //console.log(index);
    //console.log(section.title);
    //console.log(tableOfContents);

    if(loaded){
      console.log(section.title + ":" +section.pageNumber)
      if (index === -1) {
        setTableOfContents([...tableOfContents, section]);
        lastInput = section;
        
      } else {
        if (lastInput.title !== section.title) {
          if (tableOfContents[index].pageNumber < section.pageNumber) {
            const hasIndex = updatedTable.findIndex(item => item === section.title);
            if(hasIndex === -1){
              console.log("updated")
              const tempTable = [...tableOfContents];
              tempTable[index].pageNumber = section.pageNumber;
              //console.log(section.title + ":" +section.pageNumber)
              setTableOfContents(tempTable);
            }
          }
        }else{
          console.log("pp")
          if(tableOfContents[index].pageNumber===section.pageNumber){
            const tempTable = [...tableOfContents];
            tempTable[index].pageNumber = lastInput.pageNumber;
            setTableOfContents(tempTable);
            setUpdatedTable([...updatedTable, section.title])
          }
        }
        lastInput = section;
        
      }
    }else{
      if(!tmpTableOfContents.some(({title})=> title === section.title)){
        tmpTableOfContents.push(section); 
      }
  
      if(isLast&&!load){
        //console.log("---first load")
        setTableOfContents(tmpTableOfContents);
        setLoaded(true)
        //tmpTableOfContents = [];
      }
    }
        
    /*if(!tmpTableOfContents.some(({title})=> title === section.title)){
      tmpTableOfContents.push(section);
      
    }else{
      //const index = tmpTableOfContents.findIndex(s => s.title === section.title);
      tmpTableOfContents[index].pageNumber = section.pageNumber;
      console.log("updated " +section.title + " to "+section.pageNumber)
    }

    console.log(section.title+"--"+section.pageNumber)

    if(isLast&&!loaded&&!load){
      console.log("---first load")
      setTableOfContents(tmpTableOfContents);
      setLoaded(true)
      load=true
    }*/

  }

  const renderSubData = (data,title,isLast) => {
    return data.map((d, ii) => (
        <>
        {ii===0 && props.state.toc &&
        <Text style={styles.pageNumber} fixed render={({ pageNumber}) =>{
          addTableOfContents({title, pageNumber}, isLast)          
          } }/>}
        {d.data = d.data.filter(item => item!=="")}
        {d.type==="p" && (<View key={ii}><Text style={styles.text}>{[...d.data].join('\n')}</Text></View>)}
        {d.type==="ul" && d.data.map((dd,index)=>(
          <View key={index} style={styles.listItem} wrap={false}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{dd}</Text>
            
          </View>
        ))}
        
        </>
    ));
  };

  

  return (
    <Document>
      {console.log("full refresh")}
      <Page style={styles.body}>
        <View style={styles.front}>
          <Text>{props.userState.companyData.name==='' ? '(Name Of Organization)' : props.userState.companyData.name}</Text>
          <Text>{props.userState.companyData.name==='' ? '(Location of Organization)' : formatLocation(props.userState.companyData)}</Text>
          <Text>   </Text>
          <Text>{props.state.title}</Text>
          <Text>(67 FR 36484)</Text>
          <Text>   </Text>
          <Text>Rev: {props.state.rev}</Text>
          <Text>Board Approval Date: {props.state.approvalDate}</Text>
        </View>
      </Page>
      {props.state.toc && 
        <Page style={styles.body}>
          <View>
            <Text style={styles.tableTitle}>Table Of Contents</Text>
            {/*console.log("toc + "+tableOfContents.length)*/}
            {tableOfContents.map((section,index)=> (
              <Text style={styles.tableText}>
                {convertToRoman(index+1)}.{section.title}...{section.pageNumber}
              </Text>
            ))}
          </View>
          <Text style={styles.pageNumber} fixed render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
          <View style={styles.footer} fixed>
            <Text>{props.userState.companyData.name==='' ? '(Name Of Organization)' : props.userState.companyData.name}</Text>
            <Text >{props.state.title}  Revision {props.state.rev}</Text>
            <Text >Approved: {props.state.approvalDate}</Text>
          </View>
        </Page>
      }
      <Page style={styles.body}>
        {console.log("first render: "+loaded)}
        <Text style={styles.header} fixed></Text>
        {props.userState.hasImage && props.state.showLogo && <Image style={styles.image} src={props.userState.userImage} />}
        {/*<Image style={styles.image} src={WebbSecuredImg} />*/}
        {props.state.data.map((sub, index) => (
          <View key={index}>
            <View>
              <Text style={styles.title} >
                {convertToRoman(index + 1)}.{sub.subTitle}                  
              </Text>
            </View>
            {renderSubData(sub.data,sub.subTitle,index === props.state.data.length - 1)}
          </View>
        ))}
        <Text style={styles.pageNumber} fixed render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        <View style={styles.footer} fixed>
          <Text>{props.userState.companyData.name==='' ? '(Name Of Organization)' : props.userState.companyData.name}</Text>
          <Text >{props.state.title}  Revision {props.state.rev}</Text>
          <Text >Approved: {props.state.approvalDate}</Text>
        </View>
        
      </Page>
    </Document>
  );
}

export default PDFFile