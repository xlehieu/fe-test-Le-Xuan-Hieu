import { Flex } from 'antd'
import DashboardAnalytics from './components/DashboardAnalytics'
import DashboardStats from './components/DashboardStats'
import DashboardLatestTask from './components/DashboardLatestTask'

const DashboardPage = () => {
  return (
    <Flex vertical gap={20}>
      <DashboardStats/>
      <DashboardAnalytics/>
      <DashboardLatestTask/>
    </Flex>
  )
}

export default DashboardPage
