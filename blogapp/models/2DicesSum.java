import java.util.*;

public class 2DiceSum{
	public static void main(String[] args){
		int[][] array= new int[6][6];
		int i,j;
		for(i=1;i<7;i++){
			for(j=1;j<7;j++){
				array[i][j]=i+j;
				System.out.print(array[i][j]+ " ");
			}
			System.out.println('\n');
		}
	}
}