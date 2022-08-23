import { ref, watch } from '@vue/composition-api'
// import store from '@/store'

export default function useTaskHandler(props, emit) {
  // ------------------------------------------------
  // taskLocal
  // ------------------------------------------------
  const taskLocal = ref(JSON.parse(JSON.stringify(props.task.value)))
  const resetTaskLocal = () => {
    taskLocal.value = JSON.parse(JSON.stringify(props.task.value))
  }
  watch(props.task, () => {
    resetTaskLocal()
  })

  // ------------------------------------------------
  // isEventHandlerSidebarActive
  // * Clear form if sidebar is closed
  // ! We can hide it using @hidden event
  // ------------------------------------------------
  // watch(props.isEventHandlerSidebarActive, val => {
  //   // ? Don't reset event till transition is finished
  //   if (!val) {
  //     setTimeout(() => {
  //       clearForm.value()
  //     }, 350)
  //   }
  // })

  const onSubmit = () => {
    const taskData = JSON.parse(JSON.stringify(taskLocal))

    // * If event has id => Edit Event
    // Emit event for add/update event
    if (props.task.value.id) emit('update-task', taskData.value)
    else emit('add-task', taskData.value)

    // Close sidebar
    emit('update:is-task-handler-sidebar-active', false)
  }

  

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  // ------------------------------------------------
  // guestOptions
  // ------------------------------------------------

  /* eslint-disable global-require */
  const assigneeOptions = [
    { name: 'Jane Foster' },
    { name: 'Donna Frank' },
    { name: 'Gabrielle Robertson' },
    { name: 'Lori Spears' },
    { name: 'Sandy Vega' },
    {  name: 'Cheryl May' },
  ]
  /* eslint-enable global-require */

  const resolveAvatarVariant = tag => {
    // if (tags.includes('high')) return 'primary'
    // if (tags.includes('medium')) return 'warning'
    // if (tags.includes('low')) return 'success'
    // if (tags.includes('update')) return 'danger'
    // if (tags.includes('team')) return 'info'
    if (tag === 'team') return 'primary'
    if (tag === 'low') return 'success'
    if (tag === 'medium') return 'warning'
    if (tag === 'high') return 'danger'
    // if (tag === 'update') return 'info'
    return 'primary'
  }

  const tagOptions = [
    // { label: 'Team', value: 'team' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    // { label: 'Update', value: 'update' },
  ]

  return {
    taskLocal,
    resetTaskLocal,

    // UI
    assigneeOptions,
    resolveAvatarVariant,
    tagOptions,
    onSubmit,
  }
}
