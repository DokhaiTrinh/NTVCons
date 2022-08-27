import React from 'react';
import RenderImage from '../../../Components/Render/RenderImage';
import { Box, Paper } from '@mui/material';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../../Components/Tab/Tab.css';
import RenderImageCard from '../../../Components/Render/RenderImageCard';

const FileDetail = (props) => {
  const blockElements = {
    content: 'tabs-content',
    panel: 'tabs-panel',
    label: 'tabs-title',
  };
  const { imageGet, docGet } = props;
  console.log(imageGet);
  console.log(docGet);
  return (
    <Tabs>
      <Paper sx={{ width: '180px', height: '50px' }}>
        <TabList>
          <Tab>Hình ảnh</Tab>
          <Tab>Tài liệu</Tab>
        </TabList>
      </Paper>
      <Paper
        sx={{
          position: 'absolute',
          width: '89%',
          height: '70vh',
          top: '205px',
          padding: '32px',
        }}
      >
        <TabPanel>
          {/* <Box sx={{ width: '200px', height: '300px' }}>
            <div className="label-holder" style={{ height: '200px' }}>
              <label htmlFor="file" className="img-upload"></label>
              <div className="result">{RenderImage(imageGet)}</div>
            </div>
          </Box> */}
          {RenderImageCard(imageGet)}
        </TabPanel>
        <TabPanel>
          {docGet.length > 0 ? (
            docGet.map((item, index) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                <a href={item.link}>{item.name}</a>
              </div>
            ))
          ) : (
            // <div>Không có tệp đi kèm!!</div>
            <></>
          )}
        </TabPanel>
      </Paper>
    </Tabs>
  );
};

export default FileDetail;
