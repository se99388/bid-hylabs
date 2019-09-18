import { Component, OnInit } from '@angular/core';
import { BidService } from '../../services/bid.service';
import { CountBids } from '../../models/countBids';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public countBids: CountBids;
  constructor(private bidService:BidService) { }

  ngOnInit() {
    this.bidService.getCountOfAllBids().subscribe((countBidsResponse)=>{
        console.log(countBidsResponse)
        
        this.countBids = countBidsResponse[0];
        console.log(this.countBids)
    });
  }

}
