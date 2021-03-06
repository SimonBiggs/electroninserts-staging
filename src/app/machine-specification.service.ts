import { Injectable } from '@angular/core';

import { MachineSpecification } from './machine-specification';
import { InsertData } from './insert-data';

import { CurrentSettingsService } from './current-settings.service';
import { DataPersistenceService } from './data-persistence.service';

@Injectable()
export class MachineSpecificationService {
  machineList: string[]  

  specifications: MachineSpecification[]
  currentSpecification: MachineSpecification

  dataPersistenceService = new DataPersistenceService()

  constructor(
    public currentSettings: CurrentSettingsService
  ) {

  }

  checkInsertSettingsExist(insertData: InsertData) {
    let specification = this.returnMachineSpecification(insertData.machine)
    console.log(specification)
    if (
      specification.energy.indexOf(Number(insertData.energy)) > -1 &&
      specification.applicator.indexOf(String(insertData.applicator)) > -1 &&
      specification.ssd.indexOf(Number(insertData.ssd)) > -1
    ) {
      return true
    }
    else {
      return false
    }
  }

  doesMachineExist(machineID: string) {
    if (this.machineList.indexOf(machineID) > -1) {
      return true
    }
    else {
      return false
    }
  }

  returnMachineSpecification(machineID: string) {
    let machineSpecification: MachineSpecification
    let index: number

    index = this.machineList.indexOf(machineID)

    if (index == -1) {
      // throw new RangeError("Requested machine does not exist")
      machineSpecification = null
    }
    else {
      machineSpecification = this.specifications[index]
    }

    return machineSpecification
  }

  returnCurrentR50(energyLookup: number) {
    let index: number
    index = this.currentSpecification.energy.indexOf(energyLookup)
    if (index == -1) {
      throw new RangeError("Requested energy is not within the current specification")
    }
    return this.currentSpecification.R50[index]
  }

  loadData() {
    console.log('specifications-data.service loadData')
    return this.dataPersistenceService.loadCurrentSettings()
      .then((currentSettings: CurrentSettingsService) => {
        console.log('specifications-data.service loadData this.dataPersistenceService.loadCurrentSettings() promise complete')
        this.currentSettings = currentSettings
        return this.dataPersistenceService.loadSpecificationsData()
      })
      .then((specificationArray: MachineSpecification[]) => {
        console.log('specifications-data.service loadData this.dataPersistenceService.loadSpecificationsData() promise complete')
        this.specifications = specificationArray
        this.updateSpecifications()
      })
  }

  updateSpecifications() {
    console.log('specifications-data.service updateSpecifications')
    if (this.specifications == null) {
      this.specifications = []
      this.machineList = []
    }
    else {
      this.updateMachineList()
      this.updateCurrentSpecification()     
    }
  }

  updateMachineList() {
    console.log('specifications-data.service updateMachineList')
    this.machineList = []
    for (let specification of this.specifications) {
      this.machineList.push(specification.machine)
    }
  }

  updateCurrentSpecification() {
    console.log('specifications-data.service updateCurrentSpecification')

    let machineSpecification: MachineSpecification
    machineSpecification = this.returnMachineSpecification(this.currentSettings.machine)

    if (machineSpecification == null) {      
      this.currentSpecification = this.specifications[0]
      this.currentSettings.machine = this.machineList[0]
    }
    else {
      this.currentSpecification = machineSpecification
    }

    this.refreshCurrentSettings()

    // console.warn(this.currentIndex)
    // console.warn(this.specifications)
    // console.warn(this.currentSpecification)
  }

  refreshCurrentSettings() {
    console.log('specifications-data.service refreshCurrentSettings')
    if (this.currentSpecification != null) {
      for (let item of ["energy", "applicator", "ssd"]) {
        if (this.currentSpecification[item] == null) {
          this.currentSettings[item] = null
        }
        else {
          if (this.currentSpecification[item].length > 0) {
            if (this.currentSpecification[item].indexOf(this.currentSettings[item]) == -1) {
              this.currentSettings[item] = this.currentSpecification[item][0]
            } 
          }
          else {
            this.currentSettings[item] = null
          }
        }
      }
    }
    else {
      for (let item of ["energy", "applicator", "ssd"]) {
        this.currentSettings[item] = null
      }
    }
    this.dataPersistenceService.saveCurrentSettings(this.currentSettings)
  }

  newMachine(newMachineID: string, newMakeAndModel: string) {
    console.log('specifications-data.service newMachine')
    if (this.machineList.indexOf(newMachineID) != -1) {
      throw new RangeError("This 'new' machine already exists")
    }
    let newSpecification = new MachineSpecification()
    newSpecification.machine = newMachineID
    newSpecification.makeAndModel = newMakeAndModel
    this.specifications.push(newSpecification)
    this.updateMachineList()
    this.changeMachine(newMachineID)
  }

  changeMachine(swapToMachineID: string) {
    console.log('specifications-data.service changeMachine')
    this.currentSettings.machine = swapToMachineID
    this.updateCurrentSpecification()
  }
}