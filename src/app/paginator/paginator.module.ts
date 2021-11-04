import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PokeDataService } from '../services/poke-data.service';

export interface Pagination {
    page: number;
    rows: number;
    first: number;
}

@Component({
    selector: 'app-paginator',
    template: ``,
    styles: []
})
export class PaginatorComponent implements OnChanges {
    @Input() totalRecords = this.pokemonService.pokemons.length;
    @Input() rows = 0;
    @Input() currentPage = 1;
    @Input() rowsPerPageOptions: number[] = [];
    @Input() first: number = 0;

    @Output() onPageChange = new EventEmitter<Pagination>();

    lastPage = this.currentPage;
    pageLinks: number[] = [];

    constructor(private pokemonService: PokeDataService) { }

    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.totalRecords || simpleChange.rows) {
            this.lastPage = Math.ceil(this.totalRecords / this.rows);
            this.updatePageLinks();
        }
    }

    changePageToFirst(event: any) {
        this.changePage(1);
        event.preventDefault();
    }

    changePageToPrev(event: any) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }

    changePageToNext(event: any) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }

    changePageToLast(event: any) {
        this.changePage(this.getPageCount());
        event.preventDefault();
    }

    onPageLinkClick(event: any, page: number) {
        this.changePage(page);
        event.preventDefault();
    }

    onRppChange($event: Event) {
        const value = ($event.target as HTMLSelectElement).value;
        this.rows = Number(value);
        this.changePage(this.getPage());
    }

    private changePage(p: number) {
        const pc = this.getPageCount();

        if (p >= 0 && p <= pc) {
            this.onPageChange.emit({
                page: p,
                first: this.rows * p,
                rows: this.rows,
            });
        }
    }

    private updatePageLinks() {
        this.pageLinks = [];
        let [start, end] = [0, this.getPageCount() - 1];

        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }

        if (!this.pageLinks.length && !!this.totalRecords) {
            this.pageLinks.push(1);
        }
    }

    private getPage(): number {
        const dummy = Math.floor(this.first / this.rows);
        return dummy === 0 ? dummy + 1 : dummy;
    }

    private getPageCount() {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    }

}