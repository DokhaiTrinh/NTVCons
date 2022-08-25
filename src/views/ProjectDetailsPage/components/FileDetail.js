import React from 'react';
import RenderImage from '../../../Components/Render/RenderImage';
import { Box, Paper } from '@mui/material';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../../Components/Tab/Tab.css';

const FileDetail = (props) => {
  const blockElements = {
    content: 'tabs-content',
    panel: 'tabs-panel',
    label: 'tabs-title'
  }
  const { imageGet, docGet } = props;
  console.log(imageGet);
  console.log(docGet);
  return (
    <Tabs>
      <Paper sx={{height: '100px', padding: '32px'}}>

      <TabList>
        <Tab>Hình ảnh</Tab>
        <Tab>Tài liệu</Tab>
      </TabList>
      </Paper>
      <Paper sx={{position: 'absolute', width: '89%', top: '300px', padding: '32px'}}>
        <TabPanel>
          <Box sx={{ width: '200px', height: '300px' }}>
            <div className="label-holder" style={{ height: '200px' }}>
              <label htmlFor="file" className="img-upload"></label>
              <div className="result">{RenderImage(imageGet)}</div>
            </div>
          </Box>
        </TabPanel>
        <TabPanel>
          {docGet.length > 0 ? (
            docGet.map((item, index) => (
              <>
                <a href={item}>Tải xuống</a>
              </>
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
